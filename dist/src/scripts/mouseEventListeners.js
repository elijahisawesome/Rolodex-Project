import * as THREE from 'three';
import cameraMover from './cameraMover.js';
import calculatorPage from '../subPages/CalculatorPage.js';
import battleshipPage from '../subPages/BattleshipPage.js';
import CVPage from '../subPages/CVPage.js';
import soundLoader from '../sounds/audioLoader.js';
import Constants from '../Constants.js';
import { Vector2 } from 'three';

let mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();
const textureLoader = new THREE.TextureLoader();
let leafletTexture;
let currentURL;
let prevIntersect;

//move this mess to props
const mouseHandler = function(renderer, scene, myDex, buttons, camera, mixer, ambient, rolodexOpen,cardFlip, audioHoverSelect, audioLoader){
    renderer.domElement.addEventListener('click', initialOnClick, false);
    function initialOnClick(event){
        let intersects = castCalc(event, scene.children);

        if (intersects.length > 0){

            animationPlayer(mixer.clipAction(myDex.animations[0]), true);
            animationPlayer(mixer.clipAction(myDex.animations[2]), true);
            loadSounds();

            cameraMover.initCameraMove(camera);
            renderer.domElement.removeEventListener('click', initialOnClick ,false);
            renderer.domElement.addEventListener('click', listenForButtonClicks, false);
            renderer.domElement.addEventListener('mousemove', listenForHovers, false)
        }
    }


    function loadSounds(){
        soundLoader(audioLoader, rolodexOpen, Constants.AUDIO_ROLODEX_OPEN, .2,true);
        soundLoader(audioLoader, audioHoverSelect, Constants.AUDIO_BUTTON_HOVER, .025,false);
        soundLoader(audioLoader, cardFlip, Constants.AUDIO_ROLODEX_CARD_FLIP,.8,true);
    }
    
    function listenForHovers(event){
        let intersects = castCalc(event, scene.children)
        try{
            switch(intersects[0].object.parent.name){
                case buttons[1].name:
                case buttons[2].name:
                case buttons[3].name:
                case buttons[4].name:

                    if(prevIntersect != intersects[0].object.uuid){
                        prevIntersect = intersects[0].object.uuid;
                    if(audioHoverSelect.isPlaying){audioHoverSelect.stop();}
                        audioHoverSelect.play();}
                        break;
                        
                default:
                    prevIntersect = 0;    
                }
                
        }
        catch(error){
            
        }
    }

    function listenForButtonClicks(event){
        event.preventDefault();
        let intersects = castCalc(event, scene.children)


        try{        

            if(intersects[0].object.name == myDex.scene.children[8].name){
                window.location.href = currentURL;
                return;
            }

        switch(intersects[0].object.parent.name){
            case buttons[1].name:{
                animationPlayer(mixer.clipAction(myDex.animations[3]));
                setTimeout (function(){
                textureSetup(myDex.scene.children[8],calculatorPage.TextureInfo, calculatorPage.image);
                currentURL = calculatorPage.URL;
                }, 150)
                cardFlip.play();
                break
            }
            case buttons[2].name:{
                animationPlayer(mixer.clipAction(myDex.animations[3]));
                setTimeout (function(){
                textureSetup(myDex.scene.children[8],battleshipPage.TextureInfo, battleshipPage.image);
                currentURL = battleshipPage.URL;
                }, 150)
                cardFlip.play();
                break
            }
            case buttons[3].name:{
                animationPlayer(mixer.clipAction(myDex.animations[3]));
                setTimeout(function(){
                    textureSetup(myDex.scene.children[8],CVPage.TextureInfo, CVPage.image);
                currentURL = CVPage.URL;
                })
                cardFlip.play();
                break
            }
            case buttons[4].name:{
                console.log('4');
                break
            }
            default:
                break
        }}
        catch(error){

        }
        
    }


    const animationPlayer = function(target, clamp){
        let action = target;
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = clamp||false;
        action.stop();
        action.play();
    }

    
    const textureSetup = function(target, obj, image){
        let Leaflet = target;
        leafletTexture = textureLoader.load(image);
        leafletTexture.wrapS = THREE.RepeatWrapping;
        leafletTexture.wrapT = THREE.RepeatWrapping;
        leafletTexture.repeat.set(obj.scalex,obj.scaley);
        leafletTexture.rotation = obj.rotation;
        leafletTexture.offset = obj.offset;
        leafletTexture.flipY = false;

        let newMaterial = new THREE.MeshBasicMaterial({map:leafletTexture});
        Leaflet.material = newMaterial;
    }

    const castCalc = function(event, target){
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) *2-1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        rayCaster.setFromCamera(mouse,camera);
    
        return rayCaster.intersectObjects(target,true);
    }
}


export default mouseHandler;




/*
                ********Positioning tool
                ********
                
                let posx =0,
                    posy = 0;

                setInterval(()=>{
                    posy+= .05;
                    Leaflet.material.map.offset = new Vector2(posx, posy);
                    console.log(Leaflet.material.map.offset);

                },1000)*/