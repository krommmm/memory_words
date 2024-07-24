import { IModalAnswerUI } from "../interfaces/IModalAnswerUI.js";

export class ModalAnswerUI extends IModalAnswerUI {
    constructor() {
        super();
    }

    open(selector) {
        document.querySelector(`${selector}`).style.display = "flex";
    }

    close(selector) {
        document.querySelector(`${selector}`).style.display = "none";
    }

}