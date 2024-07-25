export class ICards {
    constructor() {
        if (new.target === ICards) {
            throw TypeError("Cannot construct ICards instance directly.");
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