/*

  Advanced content warning:
  Creating a fragment shader that uses Three.js lighting is tricky,
  and this seems to be the sort of approach taken to hack into / replace the vertex shader
  onBeforeCompile. You'll have to inspect the HTML document:
  https://threejs.org/examples/webgl_materials_modified 

  Showing how textures are used & tiled

  To get started:
  - only the first time on the command line run:
      npm install 
  - Every time you develop / test (look at package.json to change port for static server):
      npm run dev
  - To build your static site:
      npm run build
  - To preview a static site / build, after you have run the above command:
      npm run preview

*/

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';//camera controls

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import {displacementShader} from './vertexDisplacementShader.js'

let camera, scene, renderer, composer, clock;
let controls;

let mesh;

init();
animate();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 3000 );
  camera.position.z = 4;

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;
  document.body.appendChild( renderer.domElement );

  //post-processing
  const renderModel = new RenderPass( scene, camera );
  const effectBloom = new BloomPass( 1 );
  const outputPass = new OutputPass();

  composer = new EffectComposer( renderer );
  composer.setSize( window.innerWidth, window.innerHeight );

  composer.addPass( renderModel );
  composer.addPass( effectBloom );
  composer.addPass( outputPass );

  // camera user interaction controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  clock = new THREE.Clock();

  
  const size = 0.65;
  mesh = new THREE.Mesh( new THREE.TorusGeometry( size, 0.3, 60, 60 ), displacementShader );
  mesh.rotation.x = 0.3;
  scene.add( mesh );


  window.addEventListener( 'resize', onWindowResize );

}


function animate() {

  requestAnimationFrame( animate );

  const delta = 5 * clock.getDelta();

  displacementShader.uniforms[ 'time' ].value += 0.2 * delta;

  mesh.rotation.y += 0.0125 * delta;
  mesh.rotation.x += 0.05 * delta;

   
  renderer.clear();
  composer.render( 0.01 );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.setSize( window.innerWidth, window.innerHeight );

}
