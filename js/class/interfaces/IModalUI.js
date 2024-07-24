export class IModalUI {
    constructor() {
        if (new.target === IModalUI) {
            throw TypeError("Cannot construct IModalUI instance directly.");
        }
    }

    open(selector) {
        throw new Error("open method must be implemented");
    }

    close(selector) {
        throw new Error("close method must be implemented");
    }

    cleanInputs() {
        throw new Error("cleanInputs method must be implemented");
    }
}