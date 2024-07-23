import { IList } from "../interfaces/IList.js";

export class List extends IList {
    constructor() {
        super();
        this.list = JSON.parse(localStorage.getItem("allWords")) || [];
    }


    addWord(card) {
        this.list.push(card);
        localStorage.setItem("allWords",JSON.stringify(this.list)); 
    }

    deleteWord(cardId) {
        this.list = this.list.filter(card => card.id !== cardId)
    }

}