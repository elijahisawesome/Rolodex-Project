import * as THREE from 'three';
import cameraMover from './cameraMover.js';
import calculatorPage from '../subPages/CalculatorPage.js'
import { Vector2 } from 'three';

let mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();
const textureLoader = new THREE.TextureLoader();
let leafletTexture;
let currentURL;

const mouseHandler = function(renderer, scene, myDex, buttons, camera, mixer){
    renderer.domElement.addEventListener('click', initialOnClick, false);
    function initialOnClick(event){
        let intersects = castCalc(event, scene.children);

        if (intersects.length > 0){
            const action = mixer.clipAction(myDex.animations[0]);
            const secondAction = mixer.clipAction(myDex.animations[2]);
            action.setLoop(THREE.LoopOnce);
            secondAction.setLoop(THREE.LoopOnce);
            secondAction.clampWhenFinished = true;
            action.clampWhenFinished =true;
            action.play();
            secondAction.play();

            //document.body.append(Title);
            cameraMover.initCameraMove(camera);
            renderer.domElement.removeEventListener('click', initialOnClick ,false);
            renderer.domElement.addEventListener('click', listenForButtonClicks, false);
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
                textureSetup(myDex.scene.children[8],calculatorPage.TextureInfo);
                currentURL = calculatorPage.URL;
                }, 150)
                break
            }
            case buttons[2].name:{
                console.log('2');
                break
            }
            case buttons[3].name:{
                console.log('3');
                break
            }
            case buttons[4].name:{
                console.log('4');
                break
            }
            case myDex.scene.children[8].name:{
                console.log('5');
                break
            }
            default:
                console.log(myDex.children[8]);
                break
        }}
        catch(error){

        }
        
    }


    const animationPlayer = function(target){
        let action = target;
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = false;
        action.stop();
        action.play();
    }

    
    const textureSetup = function(target, obj){
        let Leaflet = target;
        leafletTexture = textureLoader.load(calculatorPage.image);
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