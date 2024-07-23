export class Controller {
    constructor(modalUI, list, wrongList) {
        this.modalUI = modalUI;
        this.list = list;
        this.wrongList = wrongList;
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
        if (e.target.classList.contains("add-word")) {
            this.modalUI.open("modal");
        } else if (e.target.classList.contains("exitModal")) {
            this.modalUI.close("modal");
        } else if (e.target.classList.contains("send-word")) {
            this.addCard(e);
        } else if (e.target.classList.contains("array-all")) {
            this.modalUI.close("modal");
            document.querySelector(".cardsContainer").style.display = "none";
            this.cpt = 0;
            this.all = true;
            this.wrong = false;
            if (this.list.list.length <= 0) { return; }

            this.mixWordsRandomly();
            this.initCards();
        } else if (e.target.classList.contains("card")) {
            this.translate(e);
            document.querySelector(".modalAnswer").style.display = "flex";
        } else if (e.target.classList.contains("btn-no")) {
            this.faill();
            if (this.wrong === true) {
                this.continues();
                return;
            }
            
            this.addCardInWrongList(e);
        } else if (e.target.classList.contains("btn-yes")) {
            this.success();
            this.continues(e);
        } else if (e.target.classList.contains("array-wrong")) {
            this.modalUI.close("modal");
            document.querySelector(".cardsContainer").style.display = "none";
            this.cpt = 0;
            this.wrong = true;
            this.all = false;
            if (this.wrongList.wrongList.length <= 0) { return; }
            this.initCards();
        } else if (e.target.classList.contains("resetWrongArray")) {
            localStorage.removeItem("wrongWords");
            this.wrongList.wrongList = [];
        } else if (e.target.classList.contains("delete")) {
            this.deleteCard(e);
        } else if (e.target.classList.contains("frUk")) {
            this.isReversed = false;
        } else if (e.target.classList.contains("ukFr")) {
            this.isReversed = true;
        }
    }

    deleteCard(e) {
        const container = e.target.closest(".cardsContainer");
        const id = container.dataset.id;
        this.list.deleteWord(id);
    }

    mixWordsRandomly() {
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Échange des éléments
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

    success() {
        const audio = new Audio();
        audio.src = "/assets/files/success_sound.wav";
        audio.play();
    }

    faill() {
        const audio = new Audio();
        audio.src = "/assets/files/faill_sound.wav";
        audio.play();
    }
    pass() {
        const heartBeat = "https://universal-soundbank.com/sounds/350.mp3";
        const magneto = "https://universal-soundbank.com/sounds/3802.mp3";
        const clacquement = "https://universal-soundbank.com/sounds/2166.mp3";
        const audio = new Audio();
        audio.src = clacquement;
        audio.play();
    }

    initCards() {
        this.progressBar();
        const kindOfArray = this.all ? this.list.list : this.wrongList.wrongList;
        document.querySelector(".cardsContainer").classList.add("rightToLeft");
        const cardContainer = document.querySelector(".cardsContainer");
        cardContainer.setAttribute("data-id", kindOfArray[this.cpt].id);
        document.querySelector(".cardsContainer").style.display = "flex";
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
        this.pass();
    }

    continues() {
        document.querySelector(".modalAnswer").style.display = "none";
        const kindOfArray = this.all ? this.list.list : this.wrongList.wrongList;
        if (kindOfArray.length - 1 <= this.cpt) {
            this.wrong = false;
            this.all = false;
            document.querySelector(".cardsContainer").style.display = "none";
            return;
        }
        this.cpt++;
        this.initCards();
    }

    progressBar() {
        if (this.all) {
            document.querySelector(".compteur").textContent = `${this.cpt + 1} / ${this.list.list.length}`;
            let bar = document.querySelector(".box__progressBar");
            let percentils = document.querySelector(".box__percentils");
            bar.style.width = "0%";

            const baseLeft = this.cpt + 1;
            const baseRight = this.list.list.length;

            const multiplicateur = 100 / baseRight;
            const finalLeft = baseLeft * multiplicateur;

            percentils.textContent = `${finalLeft.toFixed(2)}%`;
            percentils.style.transform = `translateX(${4 * finalLeft}px) translateY(-150%)`;
            bar.style.width = `${finalLeft}%`;
        } else {
            document.querySelector(".compteur").textContent = `${this.cpt + 1} / ${this.wrongList.wrongList.length}`;
            let bar = document.querySelector(".box__progressBar");
            let percentils = document.querySelector(".box__percentils");
            bar.style.width = "0%";

            const baseLeft = this.cpt + 1;
            const baseRight = this.wrongList.wrongList.length;

            const multiplicateur = 100 / baseRight;
            const finalLeft = baseLeft * multiplicateur;

            percentils.textContent = `${finalLeft.toFixed(2)}%`;
            percentils.style.transform = `translateX(${4 * finalLeft}px) translateY(-150%)`;
            bar.style.width = `${finalLeft}%`;
        }

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
        this.modalUI.close("modal");
    }

    addCardInWrongList(e) {
        let id = parseInt(e.target.closest(".cardsContainer").dataset.id);
        const card = this.list.list.find(card => parseInt(card.id) === id);
        if (this.wrongList.wrongList.includes(card)) {
            // console.log("cette carte à déjà été ajouté");
            this.continues();
            return;
        }
        this.wrongList.addWord(card);
        this.continues();
    }

}