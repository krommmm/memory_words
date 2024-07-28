import { ICardsUI } from "../interfaces/ICardsUI.js";

export class CardsUI extends ICardsUI{
    constructor() {
        super();
    }

    displayInfoToCardHandle(card){
        document.querySelector(".CardHandle__fr").textContent = card.frName;
        document.querySelector(".CardHandle__uk").textContent = card.ukName;
    }
}