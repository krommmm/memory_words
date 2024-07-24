export class ICardsUI {
    constructor() {
        if (new.target === ICardsUI) {
            throw TypeError("Cannot construct ICardsUI instance directly.");
        }
    }

    addCard() {
        throw new Error("addWord method must be implemented");
    }

    addCardToWrongList() {
        throw new Error("addWord method must be implemented");
    }

    deleteCard() {
        throw new Error("addWord method must be implemented");
    }

    deleteWrongCard() {
        throw new Error("addWord method must be implemented");
    }

    initCards() {
        throw new Error("addWord method must be implemented");
    }

    continues() {
        throw new Error("addWord method must be implemented");
    }

    translate() {
        throw new Error("addWord method must be implemented");
    }

}