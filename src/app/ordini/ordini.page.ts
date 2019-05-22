import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-ordini',
  templateUrl: 'ordini.page.html',
  styleUrls: ['ordini.page.scss']
})
export class OrdiniPage implements OnInit {

  constructor(private prodService: ProductsService) { }

  ngOnInit() {
    this.prodService.getProducts().subscribe(res => {
      console.log(res);
    });
  }
}
