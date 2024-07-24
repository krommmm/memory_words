import { Controller } from "./class/services/controller.js";
import { ModalUI } from "./class/utils/ModalUI.js";
import { List } from "./class/utils/List.js";
import { WrongList } from "./class/utils/WrongList.js";
import { ModalAnswerUI } from "./class/utils/ModalAnswerUI.js";
import { ProgressBar } from "./class/utils/ProgressBar.js";
import { ProgressBarUI } from "./class/utils/ProgressBarUI.js";
import { Sounds } from "./class/utils/Sounds.js";


document.addEventListener("DOMContentLoaded", (e) => {
    const modalUI = new ModalUI();
    const list = new List();
    const modalAnswerUI = new ModalAnswerUI();
    const wrongList = new WrongList();
    const progressBar = new ProgressBar();
    const progressBarUI = new ProgressBarUI();
    const sounds = new Sounds();
    new Controller(modalUI, list, wrongList, modalAnswerUI, progressBar, progressBarUI, sounds);
});