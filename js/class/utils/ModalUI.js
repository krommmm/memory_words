import { IModalUI } from "../interfaces/IModalUI.js";

export class ModalUI extends IModalUI {
    constructor() {
        super();
    }

    open(selector) {
        document.querySelector(`${selector}`).style.transform = "translateY(200px)";
    }

    close(selector) {
        document.querySelector(`${selector}`).style.transform = "translateY(-616px)";
    }

    cleanInputs() {
        document.querySelectorAll("INPUT").forEach((input) => input.value = "");
    }
}