import { ISounds } from "../interfaces/ISounds.js";

export class Sounds extends ISounds {
    constructor() {
        super();
    }

    success() {
        const audio = new Audio();
        audio.src = "assets/files/success_sound.wav";
        audio.volume = 0.1; 
        audio.play();
    }

    faill() {
        const audio = new Audio();
        const denis = "assets/files/denis_nedry.mp3";
        const chewbacca = "assets/files/chewbacca.swf.mp3";
        audio.src = denis;
        audio.volume = 0.1; 
        audio.play();
    }

    pass() {
        const heartBeat = "https://universal-soundbank.com/sounds/350.mp3";
        const magneto = "https://universal-soundbank.com/sounds/3802.mp3";
        const clacquement = "https://universal-soundbank.com/sounds/2166.mp3";
        const audio = new Audio();
        audio.src = clacquement;
        audio.volume = 0.1; 
        audio.play();
    }

    speak(text) {

        // Vérifier si le navigateur supporte l'API Web Speech
        if ('speechSynthesis' in window) {
            // Créer une instance de SpeechSynthesisUtterance
            const utterance = new SpeechSynthesisUtterance(text);
            // Définir la langue sur anglais
            utterance.lang = 'en-GB';

            // Utiliser speechSynthesis pour prononcer le texte
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support speech synthesis.');
        }
    }
}