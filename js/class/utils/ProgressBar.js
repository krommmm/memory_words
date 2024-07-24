import { IProgressBar } from "../interfaces/IProgressBar.js";

export class ProgressBar extends IProgressBar {
    constructor() {
        super();
    }


    getWidth() {
        return document.body.clientWidth;
    }

    getInfoForPercentilConversion(cpt, list) {
        cpt++;
        const listLenght = list.length;
        const multiplicator = 100 / listLenght;
        const percentNumber = cpt * multiplicator;
        const percentNumberShorted = percentNumber.toFixed(2);

        const bodyWidth = this.getWidth();
        const nb = bodyWidth <= 735 ? 2 : 4;
        const percentilWidth = nb * percentNumber;

        return {
            cpt: cpt,
            listLenght: listLenght,
            percentNumber: percentNumber,
            percentNumberShorted: percentNumberShorted,
            percentilWidth: percentilWidth
        }

    }


}