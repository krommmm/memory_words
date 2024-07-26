import { IModalUI } from "../interfaces/IModalUI.js";

export class ModalUI extends IModalUI {
    constructor() {
        super();
    }

    open(selector) {
        document.querySelector(`${selector}`).style.transform = "translateY(0px)";
    }

    close(selector) {
        document.querySelector(`${selector}`).style.transform = "translateY(-1053px)";
    }

    cleanInputs() {
        document.querySelectorAll("INPUT").forEach((input) => input.value = "");
    }
}