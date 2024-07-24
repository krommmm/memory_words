export class IProgressBarUI {
    constructor() {
        if (new.target === IProgressBarUI) {
            throw TypeError("Cannot construct IProgressBarUI instance directly.");
        }
    }

    displayFraction(info) {
        throw new Error("displayFraction method must be implemented");
    }

    displayPercentils(info) {
        throw new Error("displayPercentils method must be implemented");
    }

}