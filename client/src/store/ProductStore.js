import {makeAutoObservable} from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [
      {id: 1, name: "Smartphones"},
      {id: 2, name: "TV"},
      {id: 3, name: "Tablets"},
      {id: 4, name: "Notebooks"},
    ];
    this._brands = [
      {id: 1, name: "Apple"},
      {id: 2, name: "Samsung"},
      {id: 3, name: "Google"},
      {id: 4, name: "Xiaomi"},
    ];
    this._products = [
      {id: 1, name: "Iphone 13 pro", price: 24999, rating: 5, img: "https://place-hold.it/500x500/fab800/000.jpg&text=Iphone%2013%20pic&fontsize=16"},
      {id: 2, name: "Galaxy S3", price: 8999, rating: 4, img: "https://place-hold.it/500x500/fab800/000.jpg&text=Iphone%2013%20pic&fontsize=16"},
      {id: 3, name: "Redmi Note", price: 12499, rating: 4, img: "https://place-hold.it/500x500/fab800/000.jpg&text=Iphone%2013%20pic&fontsize=16"},
      {id: 4, name: "Nothing phone 1", price: 10299, rating: 5, img: "https://place-hold.it/500x500/fab800/000.jpg&text=Iphone%2013%20pic&fontsize=16"},
      {id: 5, name: "Nothing phone 1", price: 10299, rating: 5, img: "https://place-hold.it/500x500/fab800/000.jpg&text=Iphone%2013%20pic&fontsize=16"},
      {id: 6, name: "Nothing phone 1", price: 10299, rating: 5, img: "https://place-hold.it/500x500/fab800/000.jpg&text=Iphone%2013%20pic&fontsize=16"},
    ];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setProducts(products) {
    this._products = products;
  }

  setSelectedType(type) {
    this._selectedType= type;
  }
  setSelectedBrand(brand) {
    this._selectedBrand= brand;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get products() {
    return this._products;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}