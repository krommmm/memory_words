import { IModal } from "../interfaces/IModal.js";

export class ModalUI extends IModal {
    constructor() {
        super();
    }

    open(selector) {
        document.querySelector(`.${selector}`).style.transform = "translateY(200px)";
    }

    close(selector) {
        document.querySelector(`.${selector}`).style.transform = "translateY(-200px)";
    }

    cleanInputs() {
        document.querySelectorAll("INPUT").forEach((input) => input.value = "");
    }
}