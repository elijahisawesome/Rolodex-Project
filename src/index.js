import * as THREE from 'three';
import { AnimationMixer } from 'three';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';



const main = (function(){
        let myDex;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const loader = new GLTFLoader();
        const light = new THREE.PointLight();
        const renderer = new THREE.WebGLRenderer();
        const clock = new THREE.Clock();
        let mixer;

        loader.loadAsync(
            '/src/models/Rolodex.glb',
            (gltf)=>{
                return gltf;

            },
            function(xhr){
                console.log((xhr.loaded/xhr.total*100)+'% loaded');
            },
            function(err){
                console.log(err);
                console.error('An error happened');
            }
        )
            .then(gltf=>{
                console.log(gltf);
                scene.add(gltf.scene);
                myDex = gltf;
                myDex.scene.position.x -=1;
                onLoad(gltf);})
            .catch((er)=>{console.log(er)});
        function animate(){
            requestAnimationFrame(animate);
           if(myDex){
                mixer.update(clock.getDelta());
           }
            renderer.render(scene,camera);
        }
        
        function init(){
            light.position.x = 5;
            light.position.y = 5;
            light.position.z = 2;
            scene.add(light);
            camera.position.z = 5;
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            renderer.setClearColor(0xffbf22);
            document.body.appendChild(renderer.domElement);
            animate();
        }  
        const onLoad = function (objects){
            objects.scene.rotation.y = 4.71239;
            mixer = new AnimationMixer(myDex.scene);
            const clips = objects.animations;
            

            window.addEventListener('click', ()=>{
                const action = mixer.clipAction(myDex.animations[0]);
                const secondAction = mixer.clipAction(myDex.animations[2]);
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished =true;
                secondAction.play();
                    
            })
        }

        

        init();

    })()