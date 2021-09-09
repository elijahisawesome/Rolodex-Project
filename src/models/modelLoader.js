import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';




const modelLoader = function(){
    let models;
    let loader = new GLTFLoader();
    let buttonLoc = '/src/models/Default_Button.glb';
    let dexLoc = '/src/models/Rolodex.glb';
    let tableAndRoomLoc = '/src/models/Rest_Of_Room.glb';


    if (process.env.NODE_ENV == 'production'){
        buttonLoc = '/Rolodex-Project' + buttonLoc;
        dexLoc = '/Rolodex-Project' + dexLoc;
        tableAndRoomLoc = '/Rolodex-Project' + tableAndRoomLoc;
    }

    let defaultButton = loader.loadAsync(
        buttonLoc,
        null,
        function(error){console.log(error)}
    )
    let Rolodex = loader.loadAsync(
        dexLoc,
        null,
        function(error){console.log(error)});

    let tableAndRoom = loader.loadAsync(
        tableAndRoomLoc,
        null,
        function(error){console.log(error)});
    
        return Promise.all([Rolodex, defaultButton, tableAndRoom]).then((results)=>{
        models = results;
        return models;
    });

    
}

export default modelLoader