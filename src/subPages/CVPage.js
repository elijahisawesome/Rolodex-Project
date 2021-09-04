import img from './Images/Battleship_cropped.jpg';
import * as THREE from 'three';

const CVPage = (function(){
    let URL = 'https://elijahisawesome.github.io/CV-app/';
    let image = img;
    let TextureInfo = {
        scalex: 4,
        scaley: 3.5,
        rotation: Math.PI*.5,
        offset: new THREE.Vector2(-0.025, .05)
    }
    return{URL, image, TextureInfo};
})()

export default CVPage;