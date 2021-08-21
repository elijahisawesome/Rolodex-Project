import * as THREE from 'three';
const TWEEN = require('@tweenjs/tween.js');

let myMarker = {position:{
                    x: 0,
                    y: 0,
                    z: 3.5,
                },
                rotation:{
                    x: -.28,
                    y: 0,
                    z: 0,
                }}

const cameraMover = (function(){
    

    function initCameraMove(camera){
        let posTween = new TWEEN.Tween(camera.position);
        let rotTween = new TWEEN.Tween(camera.rotation);

        posTween.to({z: 3.5}, 500).onComplete(() => {console.log('1stFuck');});
        rotTween.to({x:-.28}, 500).onComplete(()=>{console.log('fuck');});
        
        posTween.start();
        rotTween.start();
    }


    return {initCameraMove};
})()

export default cameraMover;