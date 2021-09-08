export default {
    AUDIO_BUTTON_HOVER: (process.env.NODE_ENV === 'production')?'/Rolodex-Project/src/sounds/Rolodex_Sounds_BrightChime.mp3':'../src/sounds/Rolodex_Sounds_BrightChime.mp3',
    AUDIO_ROLODEX_OPEN: (process.env.NODE_ENV === 'production')?'/Rolodex-Project/src/sounds/Rolodex_Sounds_DeepBass.mp3':'../src/sounds/Rolodex_Sounds_DeepBass.mp3',
    AUDIO_ROLODEX_CARD_FLIP: (process.env.NODE_ENV === 'production')?'/Rolodex-Project/src/sounds/Rolodex_Sounds_CardFlip.mp3':'../src/sounds/Rolodex_Sounds_CardFlip.mp3'
}