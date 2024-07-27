import { ICards } from "../interfaces/ICards.js";

export class Cards extends ICards {
    constructor() {
        super();
        this.id = JSON.parse(localStorage.getItem("id-words")) || 1;
    }

    addCard(e, list, modalUI) {
        const wordsContainer = e.target.closest(".addingWordsModal");
        const frWord = wordsContainer.querySelector(".frWord");
        const ukWord = wordsContainer.querySelector(".ukWord");

        const doesThisWordAlreadyExists = this.checkIf2CardsAreSame(ukWord.value, list);
        if (doesThisWordAlreadyExists) {
            alert("You can't push this english word in the array since it's already in.");
            return;
        }

        const card = {
            id: this.id,
            frName: frWord.value,
            ukName: ukWord.value
        }
        list.addWord(card);

        this.id++;
        localStorage.setItem("id-words", JSON.stringify(this.id));
        modalUI.cleanInputs();
    }

    deleteCard(e, list) {
        if (confirm("Would you like delete this word")) {
            const container = e.target.closest(".cardsContainer");
            const id = container.dataset.id;
            list.deleteWord(id);
        }
    }


    initCards(list, wrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, wrong, isReversed) {

        list = all ? list : wrongList;
        if (cpt === undefined) { // si on est arrivé à la fin du tableau (logique dans continues return)
            return;
        }
        const res = progressBar.getInfoForPercentilConversion(cpt, list);
        progressBarUI.displayFraction(res);
        progressBarUI.displayPercentils(res);
        document.querySelector(".cardsContainer").classList.add("rightToLeft");
        const cardContainer = document.querySelector(".cardsContainer");
        cardContainer.setAttribute("data-id", list[cpt].id);
        modalAnswerUI.open(".cardsContainer");
        if (isReversed) {
            document.querySelector(".word").textContent = list[cpt].ukName;
        } else {
            document.querySelector(".word").textContent = list[cpt].frName;
        }
    }


    continues(list, wrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, wrong, isReversed) {
        modalAnswerUI.close(".modalAnswer");
        modalAnswerUI.close(".modalAnswerWrong");
        list = all ? list : wrongList;

        if (list.length - 1 <= cpt) {
            wrong = false;
            all = false;
            modalAnswerUI.close(".cardsContainer");
            return;
        }
        cpt++;
        return cpt;
    }

    addCardInWrongList(e, list, wrongList, currentList, currentWrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, wrong, isReversed) {
        let id = parseInt(e.target.closest(".cardsContainer").dataset.id);
        const card = list.find(card => parseInt(card.id) === id);

        if (wrongList.wrongList.some((card) => card.id === id)) {
            cpt = this.continues(currentList, currentWrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, wrong, isReversed);
            this.initCards(currentList, currentWrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, isReversed);
            alert("Cette carte a déjà été enregistrée");
            return;
        } else {
            wrongList.addWord(card);
            cpt = this.continues(currentList, currentWrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, wrong, isReversed);
            this.initCards(currentList, currentWrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, isReversed);
        }


    }

    checkIf2CardsAreSame(currentEnglishWord, list) {
        console.log(list);
        return list.list.some((card) => card.ukName === currentEnglishWord);
    }
}