import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/service_cliente/cart.service';
import { AuthService } from 'src/app/services/user/auth.service';
@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit{

  
  selectedItems = [];
  total = 0;

  idCarrello: string;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {

  }

  ngOnInit(){
    this.getDatiUtente();
  }


  getDatiUtente(){
    this.authService.userDataPromise();
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
