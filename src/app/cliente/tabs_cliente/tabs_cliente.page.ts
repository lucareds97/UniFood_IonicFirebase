import { Component } from '@angular/core';
import { CartService } from 'src/app/services/service_cliente/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs_cliente.page.html',
  styleUrls: ['tabs_cliente.page.scss']
})
export class TabsPageCliente {

  carrello: any;

  constructor(private cartService: CartService) {
    this.carrello = this.cartService.carrello;
  }


}
