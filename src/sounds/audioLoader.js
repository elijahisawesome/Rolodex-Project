
const audioLoader = function(aLoader,sound, location,volume,immediatePlaying){
    

    aLoader.load(location, (buffer)=>{
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(volume);
        if(immediatePlaying){
            sound.play();
        }
    })
}

export default audioLoader;