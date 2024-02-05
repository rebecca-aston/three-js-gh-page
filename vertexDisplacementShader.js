import * as THREE from 'three';

const uniforms = {
    'time': { value: 1.0 }
};

const vertexShader = `
    varying vec2 vUv;
    uniform float time;

    void main()
    {
        vUv = uv;

        // Displace vertices using sine waves
        vec3 displacedPosition = position;
        // displacedPosition.x += sin(position.y * 5.0 + time) * 0.1;
        displacedPosition.y += sin(position.x * 5.0 + time) * 0.1;

        vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `

    varying vec2 vUv;

    void main(void) {
      
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }
`;

export const displacementShader = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    wireframe: true
});
