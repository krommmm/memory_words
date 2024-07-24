export class Controller {
    constructor(modalUI, list, wrongList, modalAnswerUI, progressBar, progressBarUI, sounds) {
        this.modalUI = modalUI;
        this.list = list;
        this.wrongList = wrongList;
        this.modalAnswerUI = modalAnswerUI;
        this.progressBar = progressBar;
        this.progressBarUI = progressBarUI;
        this.sounds = sounds;
        this.init();
        this.id = JSON.parse(localStorage.getItem("id-words")) || 1;
        this.cpt = 0;
        this.all = false;
        this.wrong = false;
        this.isReversed = false;
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener("click", this.handleClicks.bind(this));
    }

    handleClicks(e) {
        if(e.target.classList.contains("bars")){
            document.querySelector(".menu").classList.toggle("hidden");
        }else if (e.target.classList.contains("add-word")) {
            this.modalUI.open(".modal");
        } else if (e.target.classList.contains("exitModal")) {
            this.modalUI.close(".modal");
        } else if (e.target.classList.contains("send-word")) {
            this.addCard(e);
        } else if (e.target.classList.contains("array-all")) {
            this.modalUI.close(".modal");
            this.modalAnswerUI.close(".modalAnswer");
            this.modalAnswerUI.close(".cardsContainer");
            this.modalAnswerUI.close(".modalAnswerWrong");
            this.cpt = 0;
            this.all = true;
            this.wrong = false;
            if (this.list.list.length <= 0) { return; }

            this.mixWordsRandomly();
            this.initCards();
        } else if (e.target.classList.contains("card")) {
            this.translate(e);
            if (this.all) {
                this.modalAnswerUI.open(".modalAnswer");
            } else if (this.wrong) {
                this.modalAnswerUI.open(".modalAnswerWrong");
            }
        } else if (e.target.classList.contains("btn-no")) {
            this.sounds.faill();
            if (this.wrong === true) {
                this.continues();
            } else {
                this.addCardInWrongList(e);
            }

        } else if (e.target.classList.contains("btn-yes")) {
            this.sounds.success();
            this.continues(e);
        } else if (e.target.classList.contains("array-wrong")) {
            this.modalUI.close(".modal");
            this.modalAnswerUI.close(".modalAnswer");
            this.modalAnswerUI.close(".cardsContainer");
            this.modalAnswerUI.close(".modalAnswerWrong");
            this.cpt = 0;
            this.wrong = true;
            this.all = false;
            if (this.wrongList.wrongList.length <= 0) { return; }
            this.initCards();
        } else if (e.target.classList.contains("resetWrongArray")) {
            this.resetWrongArray();
        } else if (e.target.classList.contains("delete")) {
            this.deleteCard(e);
            this.continues();
        } else if (e.target.classList.contains("frUk")) {
            this.isReversed = false;
        } else if (e.target.classList.contains("ukFr")) {
            this.isReversed = true;
        } else if (e.target.classList.contains("btn-next")) {
            this.continues();
        } else if (e.target.classList.contains("deleteWrong")) {
            this.deleteWrongCard(e);
            this.continues();
        }
    }

    resetWrongArray() {
        if (confirm("Are you sure that you want to delete the wrong array.")) {
            localStorage.removeItem("wrongWords");
            this.wrongList.wrongList = [];
        }
    }

    deleteCard(e) {
        if (confirm("Would you like delete this word")) {
            const container = e.target.closest(".cardsContainer");
            const id = container.dataset.id;
            this.list.deleteWord(id);
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
        const array = this.all ? this.list.list : this.wrongList.wrongList;
        if (this.all) {
            this.list.list = shuffle(array);
        } else {
            this.wrongList.wrongList = shuffle(array)
        }
    }




    initCards() {
        const list = this.all ? this.list.list : this.wrongList.wrongList;
        const res = this.progressBar.getInfoForPercentilConversion(this.cpt, list);
        this.progressBarUI.displayFraction(res);
        this.progressBarUI.displayPercentils(res);

        const kindOfArray = this.all ? this.list.list : this.wrongList.wrongList;
        document.querySelector(".cardsContainer").classList.add("rightToLeft");
        const cardContainer = document.querySelector(".cardsContainer");
        cardContainer.setAttribute("data-id", kindOfArray[this.cpt].id);
        this.modalAnswerUI.open(".cardsContainer");
        if (this.isReversed) {
            document.querySelector(".word").textContent = kindOfArray[this.cpt].ukName;
        } else {
            document.querySelector(".word").textContent = kindOfArray[this.cpt].frName;
        }

    }

    translate(e) {
        document.querySelector(".cardsContainer").classList.remove("rightToLeft");
        let id = e.target.closest(".cardsContainer").dataset.id;
        if (this.isReversed) {
            document.querySelector(".word").textContent = this.list.list.find(card => parseInt(card.id) === parseInt(id)).frName;
        } else {
            document.querySelector(".word").textContent = this.list.list.find(card => parseInt(card.id) === parseInt(id)).ukName;
        }
        this.sounds.pass();
    }

    continues() {
        this.modalAnswerUI.close(".modalAnswer");
        this.modalAnswerUI.close(".modalAnswerWrong");
        const kindOfArray = this.all ? this.list.list : this.wrongList.wrongList;
        if (kindOfArray.length - 1 <= this.cpt) {
            this.wrong = false;
            this.all = false;
            this.modalAnswerUI.close(".cardsContainer");
            return;
        }
        this.cpt++;
        this.initCards();
    }

    checkIf2CardsAreSame(currentEnglishWord) {
        return this.list.list.some((card) => card.ukName === currentEnglishWord);
    }

    addCard(e) {
        const wordsContainer = e.target.closest(".addingWordsModal");
        const frWord = wordsContainer.querySelector(".frWord");
        const ukWord = wordsContainer.querySelector(".ukWord");

        const doesThisWordAlreadyExists = this.checkIf2CardsAreSame(ukWord.value);
        if (doesThisWordAlreadyExists) {
            alert("You can't push this english word in the array since it's already in.");
            return;
        }

        const card = {
            id: this.id,
            frName: frWord.value,
            ukName: ukWord.value
        }
        this.list.addWord(card);

        this.id++;
        localStorage.setItem("id-words", JSON.stringify(this.id));
        this.modalUI.cleanInputs();
        this.modalUI.close(".modal");
    }

    addCardInWrongList(e) {
        let id = parseInt(e.target.closest(".cardsContainer").dataset.id);
        const card = this.list.list.find(card => parseInt(card.id) === id);
        if (this.wrongList.wrongList.includes(card)) {
            this.continues();
            return;
        }
        this.wrongList.addWord(card);
        this.continues();
    }

}