export class IProgressBar {
    constructor() {
        if (new.target === IProgressBar) {
            throw TypeError("Cannot construct IProgressBar instance directly.");
        }
    }

    getWidth() {
        throw new Error("getWidth method must be implemented");
    }

    getInfoForPercentilConversion() {
        throw new Error("getInfoForPercentilConversion method must be implemented");
    }

}