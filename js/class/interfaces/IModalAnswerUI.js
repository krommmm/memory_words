export class IModalAnswerUI {
    constructor() {
        if (new.target === IModalAnswerUI) {
            throw TypeError("Cannot construct IModalAnswerUI instance directly.");
        }
    }

    open(selector) {
        throw new Error("open method must be implemented");
    }

    close(selector) {
        throw new Error("close method must be implemented");
    }

    toggle(selector) {
        throw new Error("toggle method must be implemented");
    }

    add(selector) {
        throw new Error("add method must be implemented");
    }

    remove(selector) {
        throw new Error("remove method must be implemented");
    }

}