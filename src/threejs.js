import * as THREE from 'three';
//import testModel from './models/Rolodex.glb';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';



const main = (function(){
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const loader = new GLTFLoader();

        const light = new THREE.PointLight();
        light.position.x = 5;
        light.position.y = 5;
        light.position.z = 2;
        scene.add(light);

        let myDex;
        loader.load(
            '/src/models/Rolodex.glb',
            (gltf)=>{
                console.log(gltf);
                scene.add(gltf.scene);
                myDex = gltf.scene;
            },
            function(xhr){
                console.log((xhr.loaded/xhr.total*100)+'% loaded');
            },
            function(err){
                console.log(err);
                console.error('An error happened');
            }
        )

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        document.body.appendChild(renderer.domElement);

        /*
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color:0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
            */
        camera.position.z = 5;

        function animate(){
            requestAnimationFrame(animate);
            /*
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            */
           if(myDex){
                myDex.rotation.y +=0.01;
           }
            renderer.render(scene,camera);
        }
        animate();

    })()