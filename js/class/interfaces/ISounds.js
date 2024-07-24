export class ISounds {
    constructor() {
        if (new.target === ISounds) {
            throw TypeError("Cannot construct ISounds instance directly.");
        }
    }


    success() {
        throw new Error("success method must be implemented");
    }

    faill() {
        throw new Error("faill method must be implemented");
    }

    pass() {
        throw new Error("pass method must be implemented");
    }
}