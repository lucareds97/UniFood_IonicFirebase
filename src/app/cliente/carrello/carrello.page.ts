import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { CartService } from 'src/app/services/service_cliente/cart.service';
@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage {

  selectedItems = [];
  total = 0;

  constructor(private cartService: CartService, private router: Router) {

  }

  ionViewWillEnter() {
    this.asd();
  }

  asd() {
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = { ...obj, count: 1 };
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key])
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.prezzo), 0);
  }

  removeProduct(product) {
    this.cartService.removeProduct(product);
    this.asd();
  }

}
