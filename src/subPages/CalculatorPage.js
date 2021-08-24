import img from './Images/calcCapture.JPG';
import * as THREE from 'three';

const calculatorPage = (function(){
    let URL = 'https://elijahisawesome.github.io/Calc/';
    let image = img;
    let TextureInfo = {
        scalex: 2,
        scaley: .7,
        rotation: Math.PI*.5,
        offset: new THREE.Vector2(-.25, -.4)
    }
    return{URL, image, TextureInfo};
})()

export default calculatorPage;