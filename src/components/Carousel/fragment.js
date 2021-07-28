const fragment = () => {
    return `
        #ifdef GL_ES
        precision highp float;
        #endif
        #define NUM_OCTAVES 5

        float rand(vec2 n) {
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p){
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);

            float res = mix(
                mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
            return res*res;
        }

        float fbm(vec2 x) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100);
            // Rotate to reduce axial bias
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
                v += a * noise(x);
                x = rot * x * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        uniform float time;
        uniform int curIndex;
        uniform int nextIndex;

        uniform float timeline;

        uniform vec2 uTextureSize;
        uniform vec2 uQuadSize;
        uniform vec2 uResolution;



        uniform sampler2D image;
        uniform sampler2D image2;
        uniform sampler2D image3;

        varying vec2 vUv;
        vec4 sampleColor(int index, vec2 uv) {
            if (index == 0) {
                return texture2D(image, uv);
            } else if (index == 1) {
                return texture2D(image2, uv);
            } else if (index == 2) {
                return texture2D(image3, uv);
            } 
            return vec4(1.0, 1.0, 1.0, 1.0);
        }


        // vec2 getUV(vec2 uv, vec2 textureSize, vec2 quadSize){
        //     vec2 tempUV = uv - vec2(0.5);

        //     float quadAspect = quadSize.x/quadSize.y;
        //     float textureAspect = textureSize.x/textureSize.y;
        //     if(quadAspect<textureAspect){
        //         tempUV = tempUV*vec2(quadAspect/textureAspect,1.);
        //     } else{
        //         tempUV = tempUV*vec2(1.,textureAspect/quadAspect);
        //     }

        //     tempUV += vec2(0.5);
        //     return tempUV;
        // }

        void main() {
            vec2 vSize = mix(uQuadSize,uResolution, uResolution.x/ uResolution.y);
            // vec2 uv =  getUV(vUv, uTextureSize, vSize);
            vec2 uv =  vUv;
            uv -= vec2(0.5,0.5);
            float wave = fbm(2.5 * uv + time);
            float strength = smoothstep(1.0, 2.0, timeline * 2.0) - smoothstep(3.0, 5.0, timeline * 2.0);
            float distortion = mix(1.0, 1.0 + strength, wave);
            uv *= distortion;
            uv += 0.5;
            if(uv.x > 1.0 || uv.x < 0.0 || uv.y > 1.0 || uv.y < 0.0){
                discard;
            }
            vec4 imageOne = sampleColor(curIndex, uv);
            vec4 imageTwo = sampleColor(nextIndex, uv);

            float changeTimeline = smoothstep(2.0, 4.0, timeline * 2.0);
            float mixer =1.0 - step(changeTimeline, wave);
            vec4 color = mix(imageOne, imageTwo, mixer);
            gl_FragColor = color;
        }`
}

export default fragment;