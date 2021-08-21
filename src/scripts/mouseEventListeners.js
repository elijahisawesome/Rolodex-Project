import * as THREE from 'three';
import cameraMover from './cameraMover.js';

let mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();

const mouseHandler = function(renderer, scene, myDex, buttons, camera, mixer){
    renderer.domElement.addEventListener('click', initialOnClick, false);
    function initialOnClick(event){
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) *2-1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        rayCaster.setFromCamera(mouse,camera);

        let intersects = rayCaster.intersectObjects(scene.children,true);

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
        
        
    }
}

export default mouseHandler;