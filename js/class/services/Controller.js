import { irregularVerbs } from "../../data/irregularVerbs.js";
import { animals } from "../../data/animals.js";
import { bedroom } from "../../data/bedroom.js";
import { clothing } from "../../data/clothing.js";
import { kitchen } from "../../data/cuisine.js";
import { food } from "../../data/food.js";
import { fruit } from "../../data/fruit.js";
import { house } from "../../data/house.js";
import { sport } from "../../data/sport.js";
import { transport } from "../../data/transport.js";
import { vegetable } from "../../data/vegetable.js";
import { times } from "../../data/times.js";
import { places } from "../../data/places.js";
import { city } from "../../data/city.js";
import { orientation } from "../../data/orientation.js";
import { connectives } from "../../data/connectives.js"
import { vegetation } from "../../data/vegetation.js";
import { work } from "../../data/work.js";
import { bodyParts } from "../../data/bodyParts.js";
import { weather } from "../../data/weather.js";
import { emotions } from "../../data/emotions.js";
import { education } from "../../data/education.js";
import { travel } from "../../data/travel.js";
import { arts } from "../../data/arts.js";
import { entertainment } from "../../data/entertainment.js";
import { cinema } from "../../data/cinema.js";

export class Controller {
    constructor(modalUI, list, wrongList, modalAnswerUI, progressBar, progressBarUI, sounds, cards, cardsUI) {
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
        this.cardsUI = cardsUI;
        this.init();
        this.cpt = 0;
        this.all = false;
        this.wrong = false;

        // options
        this.isReversed = false;
        this.isOrdered = true;
        this.reversedSens = false;
        this.shuffle = false;

        // all libraries
        this.allLibraries = [...this.list.list, ...irregularVerbs, ...times, ...animals, ...bedroom, ...clothing, ...kitchen, ...food, ...fruit, ...house, ...sport, ...transport, ...vegetable, ...places, ...city, ...orientation, ...connectives, ...vegetation, ...work, ...bodyParts, ...weather, ...emotions, ...education, ...travel, ...arts, ...entertainment, ...cinema];
    }

    init() {
        this.currentList = this.list.list;
        this.currentWrongList = this.wrongList.wrongList;
        this.bindEvents();
        this.colorHTML();
    }

    bindEvents() {
        document.addEventListener("click", this.handleClicks.bind(this));
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleClicks(e) {
        const optionsModal = document.querySelector(".optionsModal");
        const menu = document.querySelector(".menu");
        menu.classList.contains("hidden") ? this.modalAnswerUI.open(".background") : this.modalAnswerUI.close(".background");

        if ((e.target.classList.contains("bars") && optionsModal.classList.contains("hidden")) || (e.target.classList.contains("goMenu") && optionsModal.classList.contains("hidden"))) {
            this.modalUI.close(".modal");
            this.modalAnswerUI.close(".cardsContainer");
            this.modalAnswerUI.add(".menu");
            this.modalAnswerUI.remove(".optionsModal");
            this.closeAllMenuModals();
        } else if ((e.target.classList.contains("bars")) || (e.target.classList.contains("goMenu"))){
            this.modalUI.close(".modal");
            this.modalAnswerUI.close(".cardsContainer");
            this.modalAnswerUI.toggle(".menu");
            this.modalAnswerUI.remove(".optionsModal");
            this.closeAllMenuModals();
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
                this.cpt = this.cards.continues(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
                this.cards.initCards(this.currentList, currentWrongList, progressBar, cpt, progressBarUI, modalAnswerUI, all, isReversed);
            } else {
                this.cards.addCardInWrongList(e, this.list.list, this.allLibraries, this.wrongList, this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);

            }
            this.currentWrongList = JSON.parse(localStorage.getItem("wrongWords"));

        } else if (e.target.classList.contains("btn-yes")) {
            this.sounds.success();
            this.cpt = this.cards.continues(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
        } else if (e.target.classList.contains("resetWrongArray")) {
            this.modalAnswerUI.remove(".menu");
            this.resetWrongArray();
        } else if (e.target.classList.contains("delete")) {
            const container = e.target.closest(".cardsContainer");
            const id = container.dataset.id;
            this.cards.deleteCard(id, this.list);
            this.cpt = this.cards.continues(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.list, this.wrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed
        } else if (e.target.classList.contains("btn-next")) {
            this.cpt = this.cards.continues(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
        } else if (e.target.classList.contains("deleteWrong")) {
            this.deleteWrongCard(e);
            this.cpt = this.cards.continues(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
            this.currentWrongList = JSON.parse(localStorage.getItem("wrongWords"));
        } else if (e.target.classList.contains("options")) {
            this.modalAnswerUI.toggle(".optionsModal");

        } else if (e.target.classList.contains("times")) {
            this.playLibrary(times);
        } else if (e.target.classList.contains("irregularVerbs")) {
            this.playLibrary(irregularVerbs);
        } else if (e.target.classList.contains("glass")) {
            this.modalAnswerUI.toggle(".modal_SearchBar");

        } else if (e.target.classList.contains("searchBar__exit")) {
            this.modalAnswerUI.remove(".modal_SearchBar");
        } 
        else if (e.target.classList.contains("CardHandle__menu--close")) {
            this.modalAnswerUI.remove(".modal_SearchBar");
            this.modalAnswerUI.close(".CardHandle");
        } else if (e.target.classList.contains("CardHandle__operations--delete")) {
            const id = e.target.closest(".CardHandle").dataset.id;
            this.cards.deleteCard(id, this.list);
            this.modalAnswerUI.remove(".modal_SearchBar");
            this.modalAnswerUI.close(".CardHandle");
            this.currentList = this.list.list;
        } else if (e.target.classList.contains("user")) {
            this.modalAnswerUI.open(".userModal");
        } else if (e.target.classList.contains("dailyWords")) {
            this.modalAnswerUI.open(".vocabularyModal");
        }
        // category models
        else if (e.target.classList.contains("animals")) {
            this.playLibrary(animals);
        } else if (e.target.classList.contains("bedroom")) {
            this.playLibrary(bedroom);
        } else if (e.target.classList.contains("clothing")) {
            this.playLibrary(clothing);
        } else if (e.target.classList.contains("kitchen")) {
            this.playLibrary(kitchen);
        } else if (e.target.classList.contains("food")) {
            this.playLibrary(food);
        } else if (e.target.classList.contains("fruits")) {
            this.playLibrary(fruit);
        } else if (e.target.classList.contains("house")) {
            this.playLibrary(house);
        } else if (e.target.classList.contains("sport")) {
            this.playLibrary(sport);
        } else if (e.target.classList.contains("transport")) {
            this.playLibrary(transport);
        } else if (e.target.classList.contains("vegetables")) {
            this.playLibrary(vegetable);
        } else if (e.target.classList.contains("places")) {
            this.playLibrary(places);
        } else if (e.target.classList.contains("city")) {
            this.playLibrary(city);
        } else if (e.target.classList.contains("orientation")) {
            this.playLibrary(orientation);
        }

        else if (e.target.classList.contains("connectives")) {
            this.playLibrary(connectives);
        }
        else if (e.target.classList.contains("vegetation")) {
            this.playLibrary(vegetation);
        }
        else if (e.target.classList.contains("work")) {
            this.playLibrary(work);
        }
        else if (e.target.classList.contains("bodyParts")) {
            this.playLibrary(bodyParts);
        }
        else if (e.target.classList.contains("weather")) {
            this.playLibrary(weather);
        }
        else if (e.target.classList.contains("emotions")) {
            this.playLibrary(emotions);
        }
        else if (e.target.classList.contains("education")) {
            this.playLibrary(education);
        }
        else if (e.target.classList.contains("travel")) {
            this.playLibrary(travel);
        }
        else if (e.target.classList.contains("arts")) {
            this.playLibrary(arts);
        }
        else if (e.target.classList.contains("entertainment")) {
            this.playLibrary(entertainment);
        }
        else if (e.target.classList.contains("cinema")) {
            this.playLibrary(cinema);
        }

        // options
        else if (e.target.classList.contains("frUk")) {
            this.isReversed = false;
            this.removeAllOptionChecked();
            e.target.classList.add("optionChecked");
        } else if (e.target.classList.contains("ukFr")) {
            this.isReversed = true;
            this.removeAllOptionChecked();
            e.target.classList.add("optionChecked");
        }
        else if (e.target.classList.contains("reversed")) {
            this.isReversed = false;
            this.isOrdered = false;
            this.reversedSens = true;
            this.shuffle = false;
            this.removeAllOptionChecked();
            e.target.classList.add("optionChecked");

        } else if (e.target.classList.contains("ordered")) {
            this.isReversed = false;
            this.isOrdered = true;
            this.reversedSens = false;
            this.shuffle = false;
            this.removeAllOptionChecked();
            e.target.classList.add("optionChecked");
        }
        else if (e.target.classList.contains("shuffle")) {
            this.isReversed = false;
            this.isOrdered = false;
            this.reversedSens = false;
            this.shuffle = true;
            this.removeAllOptionChecked();
            e.target.classList.add("optionChecked");
        }
        // user
        else if (e.target.classList.contains("userModal__words")) {
            this.closeUserMenu();
            this.currentList = this.list.list.filter((card) => card.type === "word");
            this.cpt = 0;
            this.all = true;
            this.wrong = false;
            if (this.list.list.length <= 0) { return; }
            this.checkOptions();
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
        }
        else if (e.target.classList.contains("userModal__phrases")) {
            this.closeUserMenu();
            this.currentList = this.list.list.filter((card) => card.type === "phrase");
            this.cpt = 0;
            this.all = true;
            this.wrong = false;
            if (this.list.list.length <= 0) { return; }
            this.checkOptions();
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.isReversed);
        }
        else if (e.target.classList.contains("add-word")) {
            this.modalAnswerUI.open(".background");
            this.modalUI.open(".modal");
            this.modalAnswerUI.remove(".menu");
        }
        else if (e.target.classList.contains("exitModal")) {
            this.modalUI.close(".modal");
        }
        else if (e.target.classList.contains("send-word")) {
            this.cards.addCard(e, this.list, this.modalUI);
        }
        else if (e.target.classList.contains("array-wrong")) {
            this.closeUserMenu();
            this.cpt = 0;
            this.wrong = true;
            this.all = false;
            if (this.wrongList.wrongList.length <= 0) { return; }
            this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
        }
    }

    colorHTML(){
        const btnOptions = document.querySelectorAll(".btnOptions");
        function randomRgbArray(){
            const r = Math.round(Math.random()*(255)+0);
            const g = Math.round(Math.random()*(255)+0);
            const b = Math.round(Math.random()*(255)+0);
            return [r,g,b];
        }
        btnOptions.forEach((btn)=>{
            const arrColor = randomRgbArray();
            btn.style.backgroundColor=`rgba(${arrColor[0]},${arrColor[1]},${arrColor[2]},.1)`;
        })
    }

    // const typeModal = document.querySelector(".typeModal").value;
    // const list = typeModal === "word" ? this.listWord.listWord : this.listPhrase.listPhrase;

    closeUserMenu() {
        this.modalAnswerUI.close(".background");
        this.modalAnswerUI.remove(".menu");
        this.modalUI.close(".modal");
        this.modalAnswerUI.close(".modalAnswer");
        this.modalAnswerUI.close(".cardsContainer");
        this.modalAnswerUI.close(".modalAnswerWrong");
    }

    removeAllOptionChecked() {
        const btnOptions = document.querySelectorAll(".myOption").forEach((option) => option.classList.remove("optionChecked"));
    }

    reorderList() {
        this.currentWrongList = this.currentWrongList.sort((a, b) => a.id - b.id);
        this.currentList = this.currentList.sort((a, b) => a.id - b.id);
    }



    checkOptions() {
        if (this.isOrdered) {
            this.reorderList();
        } else if (this.shuffle) {
            this.reorderList();
            this.mixWordsRandomly();
        } else if (this.reversedSens) {
            this.reorderList();
            this.currentWrongList = this.currentWrongList.reverse();
            this.currentList = this.currentList.reverse();
        }
    }

    playLibrary(name) {
        this.closeAllMenuModals();
        this.modalAnswerUI.remove(".menu");
        this.currentList = name;
        this.checkOptions();
        this.cpt = 0;
        this.wrong = false;
        this.all = true;
        this.cards.initCards(this.currentList, this.currentWrongList, this.progressBar, this.cpt, this.progressBarUI, this.modalAnswerUI, this.all, this.wrong, this.isReversed);
    }

    closeAllMenuModals() {
        this.modalAnswerUI.close(".userModal");
        this.modalAnswerUI.close(".vocabularyModal");
        this.modalAnswerUI.close(".optionsModal");
        this.modalAnswerUI.close(".modalAnswer");
    }

    handleKeyDown(e) {
        if (e.target.classList.contains("searchBar") && e.key === "Enter") {
            e.preventDefault();
            const word = e.target.value.toLowerCase().trim();
            const card = this.list.list.find((card) => card.frName.toLowerCase().trim() === word || card.ukName.toLowerCase().trim() === word);
            if (!card) {
                alert("Card not found.");
                return;
            }
            this.cardsUI.displayInfoToCardHandle(card);
            this.modalAnswerUI.close(".modal_SearchBar");
            this.modalAnswerUI.open(".CardHandle");
            document.querySelector(".CardHandle").setAttribute("data-id", card.id);
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
        this.currentList = shuffle(this.currentList);
        this.currentWrongList = shuffle(this.currentWrongList);
    }

    translate(e, array) {
        document.querySelector(".cardsContainer").classList.remove("rightToLeft");
        let id = e.target.closest(".cardsContainer").dataset.id;

                  
        
                    
        if (this.isReversed) {
            const text = array.find(card => parseInt(card.id) === parseInt(id)).ukName;
            this.sounds.speak(text);
            document.querySelector(".word").textContent = array.find(card => parseInt(card.id) === parseInt(id)).frName;
            document.querySelector(".oldWord").textContent = array.find(card => parseInt(card.id) === parseInt(id)).ukName + "*";

        } else {
            const text = array.find(card => parseInt(card.id) === parseInt(id)).ukName;
            this.sounds.speak(text);
            document.querySelector(".word").textContent = array.find(card => parseInt(card.id) === parseInt(id)).ukName;
            document.querySelector(".oldWord").textContent = array.find(card => parseInt(card.id) === parseInt(id)).frName + "*";
        }
        this.sounds.pass();
    }
}