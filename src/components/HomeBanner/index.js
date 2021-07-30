import React, { Component } from 'react';
import {
    WebGLRenderer,
    Scene,
    PlaneBufferGeometry,
    Clock,
    TextureLoader,
    ShaderMaterial,
    Mesh,
    Vector2,
    OrthographicCamera,
    Vector4
} from "three";
import { NavLink } from 'react-router-dom';
import './HomeBanner.scss';


export class HomeBanner extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.resolution = new Vector4(0, 0, 0, 0);
        this.mouse = new Vector2(0, 0);
    }
    componentDidMount = () => {
        this.init();
        this.animate();
    }
    componentWillUnmount = () => {
        window.removeEventListener("resize", this.onWindowResize);
        window.removeEventListener("mousemove", this.onMouseMove);
        this.geometry.dispose();
        this.material.dispose();
        this.renderer.dispose();
    }
    init = () => {
        this.scene = new Scene();
        const frustrum = 1;
        this.camera = new OrthographicCamera(frustrum / -2, frustrum / 2, frustrum / 2, frustrum / -2, -1000, 1000);
        this.camera.layers.enable = true;
        this.camera.position.set(0, 0, 2)

        this.clock = new Clock();

        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.containerRef.current.appendChild(this.renderer.domElement);
        const textureLoader = new TextureLoader();
        this.geometry = new PlaneBufferGeometry(1, 1, 100, 100);
        this.material = new ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position =projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,
            fragmentShader: `
                varying vec2 vUv;
                uniform float time;
                uniform sampler2D image;
                uniform vec2 mouse;
                uniform vec4 resolution;
                uniform float progress;
                uniform float mouseOffset;
                
                mat4 rotationMatrix(vec3 axis, float angle) {
                    axis = normalize(axis);
                    float s = sin(angle);
                    float c = cos(angle);
                    float oc = 1.0 - c;
                    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                                0.0,                                0.0,                                0.0,                                1.0);
                }

                vec3 rotate(vec3 v, vec3 axis, float angle) {
                    mat4 m = rotationMatrix(axis, angle);
                    return (m * vec4(v, 1.0)).xyz;
                }

                float rand(vec2 co){
                    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
                }

                float sdSphere( vec3 p, float r )
                {
                return length(p)-r;
                }

                float sdBox( vec3 p, vec3 b )
                {
                vec3 q = abs(p) - b;
                return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
                }

                float smin( float a, float b, float k )
                {
                    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
                    return mix( b, a, h ) - k*h*(1.0-h);
                }

                float createObject(vec3 p, float ss, float bs) {
                    float sphere = sdSphere(p , ss);
                    float box = smin(sdBox(p, vec3(bs)),sdSphere(p, bs) ,1.0);
                    float finalObject = mix(sphere, box, 0.5);
                    return finalObject;
                } 

                float sdf(vec3 p) {
                    vec3 p1 = rotate(p, vec3(1.0), time/2.0);
                    float mouseSphere = sdSphere(p-vec3(mouse * resolution.zw*mouseOffset, 0.6), 0.1);
                    float finalObject =createObject(p1, 0.7, 0.4);
                    return smin(finalObject, mouseSphere, 0.3);
                }

                vec3 calcNormal( in vec3 p )
                {
                    const float eps = 0.0001;
                    const vec2 h = vec2(eps,0);
                    return normalize( vec3(sdf(p+h.xyy) - sdf(p-h.xyy),
                                        sdf(p+h.yxy) - sdf(p-h.yxy),
                                        sdf(p+h.yyx) - sdf(p-h.yyx) ) );
                }

                vec2 getMatcap(vec3 eye, vec3 normal) {
                vec3 reflected = reflect(eye, normal);
                float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
                return reflected.xy / m + 0.5;
                }
                vec3 rgb(float r, float g, float b) {
                    return vec3(r / 255.0, g / 255.0, b / 255.0);
                }

                void main() {
                    vec2 uv = (vUv-vec2(0.5));
                    uv.x *= resolution.x /resolution.y;
                    vec3 camPos = vec3(0.0, 0.0, 2.0);
                    vec3 ray = normalize(vec3(uv, -1));

                    vec3 rayPos = camPos;
                    float t = 0.;
                    float tMax = 5.;
                    for(int i= 0; i < 256; ++i) {
                        vec3 pos = camPos + t * ray;
                        float h = sdf(pos);
                        if(h < 0.0001|| t > tMax ){
                            break;
                        }
                        t+=h;
                    }
                    vec3 bg = vec3(0.93);
                    vec3 color = vec3(0.93);
                    if(t< tMax) {
                        vec3 pos = camPos + t * ray;
                        vec3 normal = calcNormal(pos);
                        float diff = dot(vec3(1.0),normal);
                        vec2 matcapUV = getMatcap(ray, normal);
                        color = texture2D(image, matcapUV).rgb;
                        float fresnel = pow(1. + dot(ray, normal), 3.);
                        color = mix(color, bg, fresnel);
                    }
                    gl_FragColor = vec4(color, 1.0);
                }`,
            uniforms: {
                time: { value: 1.0 },
                image: { value: textureLoader.load("/mc23.jpg") },
                resolution: { value: this.resolution },
                mouse: { value: this.mouse },
                progress: { value: 0.5 },
                mouseOffset: { value: 0.5 },
            },
        })
        this.plane = new Mesh(this.geometry, this.material);
        this.scene.add(this.plane);


        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("touchmove", this.onMouseMove);
        this.onWindowResize();
    }
    onMouseMove = (e) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        this.mouse.x = (x / window.innerWidth) - 0.5;
        this.mouse.y = -((y / window.innerHeight) - 0.5);
    }
    onWindowResize = () => {
        const { offsetWidth: width, offsetHeight: height } =
            this.containerRef.current;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.imageAspect = 1;
        let a1, a2, mouseOffset;
        if (height / width > 1) {
            a1 = (width / height);
            a2 = 1;
            mouseOffset = 2.0;
        } else {
            a1 = 1;
            a2 = (height / width);
            mouseOffset = 4.0;
        }
        this.resolution.x = width;
        this.resolution.y = height;
        this.resolution.z = a1;
        this.resolution.w = a2;

        this.plane.material.uniforms.resolution.value.x = width;
        this.plane.material.uniforms.resolution.value.y = height;
        this.plane.material.uniforms.resolution.value.z = a1;
        this.plane.material.uniforms.resolution.value.w = a2;
        this.plane.material.uniforms.mouseOffset.value = mouseOffset;
    };
    animate = () => {
        this.renderer.setAnimationLoop(this.renderScene);
    };
    renderScene = () => {
        const curTime = this.clock.getElapsedTime();
        this.plane.material.uniforms.time.value = curTime;
        this.plane.material.uniforms.mouse.value = this.mouse;
        this.plane.material.uniforms.progress.value = this.mouse.x + 0.5;

        this.renderer.render(this.scene, this.camera);
    };
    render() {
        return (
            <>
                <div className="home__banner__canvas__container" ref={this.containerRef}>
                    <div className="home__banner__canvas__title">
                        <h1>Shoppy</h1>
                        <p>The Only Story You Will Ever Need</p>
                        <NavLink to="/categories">
                            <button>Explore All</button>
                        </NavLink>
                    </div>
                </div>
            </>
        )
    }
}

export default HomeBanner
