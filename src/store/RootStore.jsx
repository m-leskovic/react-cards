import data from "../data";
import { makeAutoObservable } from "mobx";

class RootStore {
  constructor() {
    this.cardStore = new CardStore(this);
  }
}

class CardStore {
  cardData = data;
  cardId = null;
  showModal = false;
  showPin = false;
  hiddenPin = "****";
  isLogged = false;

  login = {
    user: "",
    pass: "",
  };

  createCard = {
    id: "",
    number: "",
    name: "",
    valid: "",
    cvv: "",
    pin: "",
    amountEur: "",
  };

  currentCard = {
    id: "",
    number: "",
    name: "",
    valid: "",
    cvv: "",
    pin: "",
    amountEur: "",
  };

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
