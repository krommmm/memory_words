import { irregularVerbs } from "../../data/irregularVerbs.js";

export class Controller {
    constructor(modalUI, list, wrongList, modalAnswerUI, progressBar, progressBarUI, sounds, cards) {
        this.modalUI = modalUI;
        this.list = list;
        this.wrongList = wrongList;
        this.modalAnswerUI = modalAnswerUI;
        this.progressBar = progressBar;
        this.progressBarUI = progressBarUI;
        this.currentList = [];
        this.currentWrongList = [];
        this.sounds = sounds;
        this.cards = cards;
        this.init();
        this.cpt = 0;
        this.all = false;
        this.wrong = false;
        this.isReversed = false;
    }

    init() {
        this.bindEvents();
        this.currentList = this.list.list;
        this.currentWrongList = this.wrongList.wrongList;
    }

    bindEvents() {
        document.addEventListener("click", this.handleClicks.bind(this));
    }

    handleClicks(e) {
        if (e.target.classList.contains("bars")) {
            this.modalUI.close(".modal");
            this.modalAnswerUI.close(".cardsContainer");
            this.modalAnswerUI.toggle(".menu");
        } else if (e.target.classList.contains("add-word")) {
            this.modalAnswerUI.open(".background");
            this.modalUI.open(".modal");
            this.modalAnswerUI.remove(".menu");
        } else if (e.target.classList.contains("exitModal")) {
            this.modalUI.close(".modal");
        } else if (e.target.classList.contains("send-word")) {
            this.cards.addCard(e, this.list, this.modalUI);
        } else if (e.target.classList.contains("array-all")) {
            this.modalAnswerUI.close(".background");
            this.modalUI.close(".modal");
            this.modalAnswerUI.toggle(".menu");
            this.modalAnswerUI.close(".modalAnswer");
            this.modalAnswerUI.close(".cardsContainer");
            this.modalAnswerUI.close(".modalAnswerWrong");
            this.cpt = 0;
            this.all = true;
            this.wrong = false;
            if (this.list.list.length <= 0) { return; }
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
        } else if (e.target.classList.contains("card")) {
            let array = this.all ? this.currentList : this.currentWrongList;
            this.translate(e, array);
            if (this.all) {
                this.modalAnswerUI.open(".modalAnswer");
            } else if (this.wrong) {
                this.modalAnswerUI.open(".modalAnswerWrong");
            }
        } else if (e.target.classList.contains("btn-no")) {
            this.sounds.faill();
            if (this.wrong === true) {
                this.cpt = this.cards.continues(this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
                this.cards.initCards(this.currentList, currentWrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, isReversed);
            } else {
                this.addCardInWrongList(e);
            }
        } else if (e.target.classList.contains("btn-yes")) {
            this.sounds.success();
            this.cpt = this.cards.continues(this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
        } else if (e.target.classList.contains("array-wrong")) {
            this.modalAnswerUI.close(".background");
            this.modalAnswerUI.remove(".menu");
            this.modalUI.close(".modal");
            this.modalAnswerUI.close(".modalAnswer");
            this.modalAnswerUI.close(".cardsContainer");
            this.modalAnswerUI.close(".modalAnswerWrong");
            this.cpt = 0;
            this.wrong = true;
            this.all = false;
            if (this.wrongList.wrongList.length <= 0) { return; }
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
        } else if (e.target.classList.contains("resetWrongArray")) {
            this.modalAnswerUI.remove(".menu");
            this.resetWrongArray();
        } else if (e.target.classList.contains("delete")) {
            this.cards.deleteCard(e, this.list);
            this.cpt = this.cards.continues(this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed
        } else if (e.target.classList.contains("frUk")) {
            this.beatHeart(e);
            this.isReversed = false;
        } else if (e.target.classList.contains("ukFr")) {
            this.beatHeart(e);
            this.isReversed = true;
        } else if (e.target.classList.contains("btn-next")) {
            this.cpt = this.cards.continues(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
        } else if (e.target.classList.contains("deleteWrong")) {
            this.deleteWrongCard(e);
            this.cpt = this.cards.continues(this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
        } else if (e.target.classList.contains("options")) {
            this.modalAnswerUI.toggle(".optionsModal");


        } else if (e.target.classList.contains("ordered")) {
            this.modalAnswerUI.close(".optionsModal");
            this.currentList = this.list.list;
            this.currentWrongList = this.wrongList.wrongList;
            this.modalAnswerUI.toggle(".optionsModal");

        } else if (e.target.classList.contains("reversed")) {
            this.modalAnswerUI.close(".optionsModal");
            this.currentList = JSON.parse(JSON.stringify(this.list.list));
            this.currentWrongList = JSON.parse(JSON.stringify(this.wrongList.wrongList));
            this.currentList.reverse();
            this.modalAnswerUI.toggle(".optionsModal");

        } else if (e.target.classList.contains("shuffle")) {
            this.mixWordsRandomly();
            this.modalAnswerUI.close(".optionsModal");
            this.modalAnswerUI.toggle(".optionsModal");

        } else if (e.target.classList.contains("times")) {
            this.modalAnswerUI.toggle(".optionsModal");

        } else if (e.target.classList.contains("irregularVerbs")) {
            this.currentWrongList = irregularVerbs;
            this.modalAnswerUI.toggle(".optionsModal");

        }
    }

    async beatHeart(e) {
        e.target.classList.add("heart");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        e.target.classList.remove("heart");
    }

    resetWrongArray() {
        if (confirm("Are you sure that you want to delete the wrong array.")) {
            localStorage.removeItem("wrongWords");
            this.wrongList.wrongList = [];
        }
    }

    deleteWrongCard(e) {
        if (confirm("Would you like delete this word")) {
            const container = e.target.closest(".cardsContainer");
            const id = container.dataset.id;
            this.wrongList.deleteWord(id);
        }
    }

    mixWordsRandomly() {
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        this.currentList = JSON.parse(JSON.stringify(this.list.list));
        this.currentWrongList = JSON.parse(JSON.stringify(this.wrongList.wrongList));
        this.currentList = shuffle(this.currentList);
        this.currentWrongList = shuffle(this.currentWrongList);
    }

    translate(e, array) {
        document.querySelector(".cardsContainer").classList.remove("rightToLeft");
        let id = e.target.closest(".cardsContainer").dataset.id;
        if (this.isReversed) {
            document.querySelector(".word").textContent = array.find(card => parseInt(card.id) === parseInt(id)).frName;
        } else {
            document.querySelector(".word").textContent = array.find(card => parseInt(card.id) === parseInt(id)).ukName;
        }
        this.sounds.pass();
    }

    addCardInWrongList(e) {
        let id = parseInt(e.target.closest(".cardsContainer").dataset.id);
        const card = this.list.list.find(card => parseInt(card.id) === id);
        if (this.wrongList.wrongList.includes(card)) {
            this.cpt = this.cards.continues(this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
            return;
        }
        this.wrongList.addWord(card);
        this.cpt = this.cards.continues(this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
        this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
    }

}