import SoundList from "../interfaces/SoundList";
import Sound from "../interfaces/Sound";
export default class AudioManager {
    private soundList: SoundList = [
        {
            shortName: "explosion",
            url: "../src/sounds_and_visuals/sounds/explosion/explosion.wav",
        },
        {
            shortName: "fastInvader1",
            url: "../src/sounds_and_visuals/sounds/fastinvader1/fastinvader1.wav",
        },
        {
            shortName: "fastInvader2",
            url: "../src/sounds_and_visuals/sounds/fastinvader2/fastinvader2.wav",
        },
        {
            shortName: "fastInvader3",
            url: "../src/sounds_and_visuals/sounds/fastinvader3/fastinvader3.wav",
        },
        {
            shortName: "fastInvader4",
            url: "../src/sounds_and_visuals/sounds/fastinvader4/fastinvader4.wav",
        },
        {
            shortName: "invaderKilled",
            url: "../src/sounds_and_visuals/sounds/invaderkilled/invaderkilled.wav",
        },
        {
            shortName: "shoot",
            url: "../src/sounds_and_visuals/sounds/shoot/shoot.wav",
        },
        {
            shortName: "coolMusic",
            url: "../src/sounds_and_visuals/sounds/spaceinvaders1_mpeg/spaceinvaders1.mpeg",
        },
        {
            shortName: "ufoHighPitch",
            url: "../src/sounds_and_visuals/sounds/ufo_highpitch/ufo_highpitch.wav",
        },
        {
            shortName: "ufoLowPitch",
            url: "../src/sounds_and_visuals/sounds/ufo_lowpitch/ufo_lowpitch.wav",
        },
    ];
    constructor() {}
    play(audio: HTMLAudioElement): void {
        audio.play();
    }
    pause(audio: HTMLAudioElement): void {
        audio.pause();
    }
    load(name: string, audio: HTMLAudioElement) {
        let currentSong: Sound[] = this.soundList.filter(
            (elem) => elem.shortName == name
        );
        audio.src = currentSong[0].url;
    }
    restart(audio: HTMLAudioElement): void {
        audio.currentTime = 0;
    }
}
