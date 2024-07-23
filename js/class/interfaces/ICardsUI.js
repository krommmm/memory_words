export class ICardsUI {
    constructor() {
        if (new.target === ICardsUI) {
            throw TypeError("Cannot construct ICardsUI instance directly.");
        }
    }

    displayCardsContainer() {
        throw new Error("displayCardsContainer method must be implemented"); // on affiche la base + le modal
    }

    deleteWord(word) {
        throw new Error("addWord method must be implemented");
    }

}