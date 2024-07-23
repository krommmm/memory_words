import { Controller } from "./class/services/controller.js";
import { ModalUI } from "./class/utils/ModalUI.js";
import { List } from "./class/utils/List.js";
import { WrongList } from "./class/utils/WrongList.js";

document.addEventListener("DOMContentLoaded", (e) => {
    const modalUI = new ModalUI();
    const list = new List();
    const wrongList = new WrongList();
    new Controller(modalUI, list,wrongList);
});