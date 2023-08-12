import {makeAutoObservable} from "mobx";

export default class PaginationStore {
  constructor() {
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
                              // и при их изменении компоненты будут перерендериться
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  get page() {
    return this._page;
  }
  get totalCount () {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}