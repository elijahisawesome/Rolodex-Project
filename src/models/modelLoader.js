import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const modelLoader = function(){
    let models;
    let loader = new GLTFLoader();


    let defaultButton = loader.loadAsync(
        '/src/models/Default_Button.glb',
        null,
        function(error){console.log(error)}
    )
    let Rolodex = loader.loadAsync(
        '/src/models/Rolodex.glb',
        null,
        function(error){console.log(error)});

        return Promise.all([Rolodex, defaultButton]).then((results)=>{
        models = results;
        return models;
    });

    
}

export default modelLoader