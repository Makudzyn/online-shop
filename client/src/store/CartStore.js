import {makeAutoObservable} from "mobx";

export default class CartStore {
  constructor() {
    this._cartProducts = [];
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
                              // и при их изменении компоненты будут перерендериться
  }

  setCartProducts(cartProducts) {
    this._cartProducts = cartProducts;
  }

  get cartProducts() {
    return this._cartProducts;
  }

}