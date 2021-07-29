import React, { useRef, useEffect } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, PlaneBufferGeometry, ShaderMaterial, TextureLoader, Mesh, Vector2, Clock, Texture } from 'three';
import vertex from './vertex';
import fragment from './fragment';
import './carousel.scss'
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai"


let scene, camera, renderer, plane, clock;
let timeline = performance.now();
let touched;
let image1, image2, image3;
let nextCurValue, nextNextValue;
let touchable = true;
let textureLoader;
const Carousel = (props) => {
    const container = useRef();
    useEffect(() => {
        loadTextures();
        init();
        animate();
        return () => {
            plane.material.dispose();
            plane.geometry.dispose();
            renderer.dispose();
            window.removeEventListener("resize", onWindowResize)
        }
    }, [])

    const loadTextures = () => {
        const { images } = props
        textureLoader = new TextureLoader();
        // const xy = new Image();
        // xy.src = `${images[0]?.img}`;
        // xy.onload = () => {
        //     image1 = new Texture(xy);
        //     image1.needsUpdate = true;
        //     plane.material.uniforms.image.value = image1
        //     console.log(image1);

        // }
        // console.log(xy);
        if (images) {
            image1 = textureLoader.load(`${images[0]?.img}`);
            image2 = textureLoader.load(`${images[1]?.img}`);
            image3 = textureLoader.load(`${images[2]?.img}`);
        }
    }

    const changeSlide = () => {
        if (touchable) {
            touchable = false;
            if (!touched) {
                touched = true
            } else {
                plane.material.uniforms.curIndex.value = nextCurValue;
                plane.material.uniforms.nextIndex.value = nextNextValue
            };
            timeline = performance.now();
            let st = setTimeout(() => {
                const x = plane.material.uniforms.curIndex.value
                const y = plane.material.uniforms.nextIndex.value
                if (x + 1 > 2) {
                    nextCurValue = 0
                } else {
                    nextCurValue = x + 1
                }
                if (y + 1 > 2) {
                    nextNextValue = 0
                } else {
                    nextNextValue = y + 1
                }
                clearTimeout(st)
                touchable = true;
            }, 2200)
        }
    }
    const init = () => {
        scene = new Scene();
        camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.layers.enable = true;
        camera.position.set(0, 0, 5)

        clock = new Clock();

        renderer = new WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.current.appendChild(renderer.domElement);

        plane = new Mesh(
            new PlaneBufferGeometry(1.5, 3, 100, 100),
            new ShaderMaterial({
                vertexShader: vertex(),
                fragmentShader: fragment(),
                uniforms: {
                    time: { value: 1.0 },
                    curIndex: { value: 0 },
                    nextIndex: { value: 1 },
                    image: { value: image1 },
                    image2: { value: image2 },
                    image3: { value: image3 },
                    uTextureSize: { value: new Vector2(166, 416) },
                    uResolution: { value: new Vector2(0, 0) },
                    uQuadSize: { value: new Vector2(166, 416) },
                    timeline: { value: timeline - 999999 }
                },
            })
        );
        scene.add(plane);

        window.addEventListener("resize", onWindowResize);
        onWindowResize();
    }
    const onWindowResize = () => {
        const { offsetWidth: width, offsetHeight: height } =
            container.current;
        plane.material.uniforms.uResolution.value.x = width;
        plane.material.uniforms.uResolution.value.y = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    const animate = () => {
        renderer.setAnimationLoop(renderScene);
    };
    const renderScene = () => {
        const curTime = clock.getElapsedTime();
        plane.material.uniforms.time.value = curTime;
        if (touched) {
            const dt = (performance.now() - timeline) / 1000;
            plane.material.uniforms.timeline.value = dt;
        }
        renderer.render(scene, camera);
    };
    return (
        <div onClick={changeSlide} ref={container} className="carousel__container">
            <div className="carousel__controls">
                <div>
                    <AiFillCaretLeft />
                </div>
                <div>
                    <AiFillCaretRight />
                </div>
            </div>
        </div>
    )
}

export default Carousel;