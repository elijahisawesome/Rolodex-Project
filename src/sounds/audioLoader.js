/*
function playRolodexOpenSound(){
    audioLoader.load('../src/sounds/Rolodex_Sounds_DeepBass.mp3',(buffer)=>{
        rolodexOpen.setBuffer(buffer);
        rolodexOpen.setLoop(false);
        rolodexOpen.setVolume(.2);
        rolodexOpen.play();
    })
}
function playButtonHoverSound(){
    audioLoader.load('../src/sounds/Rolodex_Sounds_BrightChime.mp3', (buffer)=>{
        audioHoverSelect.setBuffer(buffer);
        audioHoverSelect.setLoop(false);
        audioHoverSelect.setVolume(.025);
        audioHoverSelect.duration = 1.5;
    })
}
function playCardFlipSound(){
    audioLoader.load('../src/sounds/Rolodex_Sounds_CardFlip.mp3',(buffer)=>{
        cardFlip.setBuffer(buffer);
        cardFlip.setLoop(false);
        cardFlip.setVolume(.8);
        cardFlip.play();
    })
}
*/


const audioLoader = function(aLoader,sound, location,volume,immediatePlaying){
    /*
    //Github pages automation, get working later.
    if(process.env.NODE_ENV == 'production'){
        location ='/Rolodex-Portfolio/'+ location;
    }*/

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