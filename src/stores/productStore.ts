import { makeAutoObservable } from "mobx";

class ProductStore {
  searchTerm: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  get currentSearchTerm() {
    return this.searchTerm;
  }
}

export const productStore = new ProductStore();
