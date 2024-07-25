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

    toggle(selector) {
        document.querySelector(selector).classList.toggle("hidden");
    }

    add(selector) {
        document.querySelector(selector).classList.add("hidden");
    }

    remove(selector) {
        document.querySelector(selector).classList.remove("hidden");
    }

}