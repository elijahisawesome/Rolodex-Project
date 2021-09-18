import img from './Images/Gallery_cropped.jpg';
import * as THREE from 'three';

const GalleryPage = (function(){
    let URL = 'https://elijahisawesome.github.io/NohemyArtGallery/';
    let image = img;
    let TextureInfo = {
        scalex: 4,
        scaley: 3.5,
        rotation: Math.PI*.5,
        offset: new THREE.Vector2(-0.025, .05)
    }
    return{URL, image, TextureInfo};
})()

export default GalleryPage;