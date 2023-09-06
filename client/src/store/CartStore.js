import {makeAutoObservable} from "mobx";

export default class CartStore {
  constructor() {
    this._cartProductPair = [];
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
                              // и при их изменении компоненты будут перерендериться
  }

  setCartProductPair(cartProductPair) {
    this._cartProductPair = cartProductPair;
  }

  get cartProductPair() {
    return this._cartProductPair;
  }
}