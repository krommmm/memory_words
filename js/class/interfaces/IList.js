export class IList {
    constructor() {
        if (new.target === IList) {
            throw TypeError("Cannot construct IList instance directly.");
        }
    }


    addWord(word) {
        throw new Error("addWord method must be implemented");
    }

    deleteWord(word) {
        throw new Error("addWord method must be implemented");
    }

}