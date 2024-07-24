import { IProgressBarUI } from "../interfaces/IProgressBarUI.js";

export class ProgressBarUI extends IProgressBarUI {
    constructor() {
        super();
    }

    displayFraction(info) {
        document.querySelector(".compteur").textContent = `${info.cpt} / ${info.listLenght}`;
    }

    displayPercentils(info) {
        let bar = document.querySelector(".box__progressBar");
        let percentils = document.querySelector(".box__percentils");
        bar.style.width = "0%";
        percentils.textContent = `${info.percentNumberShorted}%`;

        percentils.style.transform = `translateX(${info.percentilWidth}px) translateY(-150%)`;
        bar.style.width = `${info.percentNumber}%`;
    }

} 