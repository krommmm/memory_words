import { IList } from "../interfaces/IList.js";

export class WrongList extends IList {
    constructor() {
        super();
        this.wrongList = JSON.parse(localStorage.getItem("wrongWords")) || [];
    }

    addWord(card) {
        this.wrongList.push(card);
        localStorage.setItem("wrongWords", JSON.stringify(this.wrongList));
    }

    deleteWord(cardId) {
        this.wrongList = this.wrongList.filter(card => parseInt(card.id) !== parseInt(cardId));
        localStorage.setItem("wrongWords", JSON.stringify(this.wrongList));
    }
}