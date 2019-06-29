import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import {Prodotto} from 'src/app/interfaces/prodotti';
import { Carrello } from 'src/app/interfaces/carrello';
=======
import { CartService } from 'src/app/services/service_cliente/cart.service';
>>>>>>> 3a43130c4bcbee5e7a48257cf0ce3a2f08f0b31e
@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
<<<<<<< HEAD
export class CarrelloPage implements OnInit {

  visualizzaCarrello: any[] = [];
=======
export class CarrelloPage implements OnInit{
>>>>>>> 3a43130c4bcbee5e7a48257cf0ce3a2f08f0b31e

  carrello: Carrello = {
};
  
  selectedItems = [];
  total = 0;

  idCarrello: string;

  constructor(private cartService: CartService, private router: Router) {

  }

  ngOnInit(){
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

  removeAllProducts(){
    this.cartService.removeAllProducts();
  }

  

}
