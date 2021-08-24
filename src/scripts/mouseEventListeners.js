import * as THREE from 'three';
import cameraMover from './cameraMover.js';

let mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();

const mouseHandler = function(renderer, scene, myDex, buttons, camera, mixer){
    renderer.domElement.addEventListener('click', initialOnClick, false);
    function initialOnClick(event){
        let intersects = castCalc(event, scene.children);

        if (intersects.length > 0){
            const action = mixer.clipAction(myDex.animations[0]);
            const secondAction = mixer.clipAction(myDex.animations[2]);
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished =true;
            action.play();

            //document.body.append(Title);
            cameraMover.initCameraMove(camera);
            renderer.domElement.removeEventListener('click', initialOnClick ,false);
            renderer.domElement.addEventListener('click', listenForButtonClicks, false);
        }
        
        
        
    }
    function listenForButtonClicks(event){
        event.preventDefault();
        let intersects = castCalc(event, scene.children)
        switch(intersects[0].object.parent.name){
            case buttons[1].name:{
                console.log('1');
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
            default:
                console.log(intersects[0].object);
                break
        }
        
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