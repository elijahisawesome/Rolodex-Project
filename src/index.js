import * as THREE from 'three';
import { AnimationMixer, MathUtils} from 'three';
import './style.css';

import modelLoader from "./models/modelLoader.js";
import mouseHandler from './scripts/mouseEventListeners.js';
import soundLoader from './sounds/audioLoader.js';
import TWEEN from '@tweenjs/tween.js';
import Constants from './Constants.js';



const main = (function(){
        let myDex;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
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
        let restOfRoom;
        let buttons;
        let mixer;

        let models = modelLoader();
        models
            .then(results=>{
                myDex = results[0];
                restOfRoom = results.pop();
                results.shift();
                buttons = results;

                scene.add(myDex.scene);
                scene.add(restOfRoom.scene);
                addButtonsToScene(buttons, AMOUNT_OF_BUTTONS);
                
                correctlyPositionRolodexAndRoom(restOfRoom);
                
                myDex.scene.position.x -=1;
                restOfRoom.scene.position.x -=1;
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
        
        function correctlyPositionRolodexAndRoom(object){
            object.scene.rotation.y = 4.71239;
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
            rolodexOpen= new THREE.Audio(listener);
            cardFlip = new THREE.Audio(listener);

            light.position.x = 5;
            light.position.y = 5;
            light.position.z = 2;
            scene.add(light);
            camera.position.z = 8;
            camera.position.y = 3;
            camera.rotation.x = -.087;
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            renderer.setClearColor(0x000000);
            document.body.appendChild(renderer.domElement);
            window.addEventListener( 'resize', onWindowResize, false );
            animate();
            playDefaultAudio();
        }  

        
        const onLoadMain = function (objects){
            objects.scene.rotation.y = 4.71239;
            mixer = new AnimationMixer(myDex.scene);
            onLoadListenForMouseRotation();
            mouseHandler(renderer, scene, objects, buttons,camera, mixer, ambient, rolodexOpen,cardFlip, audioHoverSelect, audioLoader);
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
            soundLoader(audioLoader,ambient, Constants.AUDIO_INITIAL_DRONE,.25,true)
        }
        
        function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        init();

    })()