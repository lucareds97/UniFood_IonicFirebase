import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];

  constructor() { }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }

  removeProduct(product) {
    this.cart.splice(product, 1);
  }


}
