import img from './Images/EtchASketch_Cropped.jpg';
import * as THREE from 'three';

const EtchASketchPage = (function(){
    let URL = 'https://elijahisawesome.github.io/Etch-A-Sketch/';
    let image = img;
    let TextureInfo = {
        scalex: 4,
        scaley: 3.5,
        rotation: Math.PI*.5,
        offset: new THREE.Vector2(-0.025, .05)
    }
    return{URL, image, TextureInfo};
})()

export default EtchASketchPage;