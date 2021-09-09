import * as THREE from 'three';
const TWEEN = require('@tweenjs/tween.js');

let myMarker = {position:{
                    x: 0,
                    y: 0,
                    z: 3.5,
                },
                rotation:{
                    x: -.0847,
                    y: -.0016,
                    z: .00327,
                }}

const cameraMover = (function(){
    

    function initCameraMove(camera){
        let posTween = new TWEEN.Tween(camera.position);
        let rotTween = new TWEEN.Tween(camera.rotation);

        posTween.to({z: 3.5,y:0}, 500);
        rotTween.to({x:myMarker.rotation.x, y:myMarker.rotation.y, z:myMarker.rotation.z}, 500);
        
        posTween.start();
        rotTween.start();
    }


    return {initCameraMove};
})()

export default cameraMover;