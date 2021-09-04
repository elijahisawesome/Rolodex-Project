import * as THREE from 'three';
import { AnimationMixer, MathUtils, Vector2 } from 'three';
import './style.css';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
import test from "./subPages/testPage.js";
import modelLoader from "./models/modelLoader.js";
import mouseHandler from './scripts/mouseEventListeners.js';
import TWEEN from '@tweenjs/tween.js';



const main = (function(){
        let myDex;
        let Title;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const loader = new GLTFLoader();
        const light = new THREE.PointLight();
        const renderer = new THREE.WebGLRenderer();
        const clock = new THREE.Clock();
        const AMOUNT_OF_BUTTONS = 5;
        const listener = new THREE.AudioListener();
        const audioLoader = new THREE.AudioLoader();
        let ambient;
        let audioHoverSelect;
        let rolodexOpen;
        let cardFlip;
        let handler;
        let buttons;

        let models = [];
        //testing stuff

        let mixer;

        models = modelLoader();
        

        models
            .then(results=>{
                myDex = results[0];
                results.shift();
                buttons = results;

                scene.add(myDex.scene);
                addButtonsToScene(buttons, AMOUNT_OF_BUTTONS);
                
                
                myDex.scene.position.x -=1;
                onLoadMain(myDex);
                positionButtons(buttons)
            })
            .catch((er)=>{console.log(er)});

        function animate(){
            requestAnimationFrame(animate);
            
           if(!!myDex && !!mixer)
            {
                mixer.update(clock.getDelta());
                TWEEN.update();
            }
           
            renderer.render(scene,camera);
        }
        
        function positionButtons(buttons){
            let posx = -1.15;

            buttons.forEach(button => {
            if(!!button.position)
                {       
                button.rotation.y = 4.71239;
                button.position.x = posx;
                posx--;
                }
            })
        }
        function addButtonsToScene(buttons, amt){
            let button = buttons[0];
            for(let x = 1; x<amt; x++)
            {
                let newButton = button.scene.clone();
                newButton.name = x;
                buttons[x] = (newButton);
                scene.add(newButton);
            }
        }
        
        function init(){
            camera.add(listener);
            ambient = new THREE.Audio(listener);
            audioHoverSelect = new THREE.Audio(listener);
            cardFlip= new THREE.Audio(listener);
            rolodexOpen= new THREE.Audio(listener);

            light.position.x = 5;
            light.position.y = 5;
            light.position.z = 2;
            scene.add(light);
            camera.position.z = 5;
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            renderer.setClearColor(0xffbf22);
            document.body.appendChild(renderer.domElement);
            Title = test();
            animate();
            playDefaultAudio();
        }  

        
        const onLoadMain = function (objects){
            objects.scene.rotation.y = 4.71239;
            mixer = new AnimationMixer(myDex.scene);
            const clips = objects.animations;
            onLoadListenForMouseRotation();
            mouseHandler(renderer, scene, objects, buttons,camera, mixer, ambient, rolodexOpen, audioHoverSelect,cardFlip, audioLoader);
        }
        function onLoadListenForMouseRotation(){
            renderer.domElement.addEventListener('mousedown', (e)=>{
                renderer.domElement.addEventListener('mousemove', cameraRotations);
                renderer.domElement.addEventListener('mouseleave', endCameraRotations);
                renderer.domElement.addEventListener('mouseup', endCameraRotations);
                e.stopPropagation();
            });
            function cameraRotations(event){
                MathUtils.clamp(camera.quaternion.y, -.02, .02);
                MathUtils.clamp(camera.quaternion.x, -.02, .02);
                camera.quaternion.y -= (event.movementX*.0001);
                camera.quaternion.x -= (event.movementY*.0001);
            }
            function endCameraRotations(){
                renderer.domElement.removeEventListener('mousemove', cameraRotations);
                renderer.domElement.removeEventListener('mouseleave', endCameraRotations);
                renderer.domElement.removeEventListener('mouseUp', endCameraRotations);
            }
        }
        function playDefaultAudio(){
            audioLoader.load('../src/sounds/Rolodex_Sounds_Drone.mp3', (buffer)=>{
                ambient.setBuffer(buffer);
                ambient.setLoop(true);
                ambient.setVolume(.25);
                ambient.play();
            })
        }

        init();

    })()