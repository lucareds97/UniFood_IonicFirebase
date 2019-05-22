import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Prodotto } from '../interfaces/prodotti';

@Component({
  selector: 'app-nuovo-prodotto',
  templateUrl: 'nuovo-prodotto.page.html',
  styleUrls: ['nuovo-prodotto.page.scss']
})
export class NuovoProdottoPage implements OnInit {

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: '',
    linkImmagine: '',

  };

  constructor(private prodService: ProductsService) {
   }

  ngOnInit() {
    this.prodService.getProducts().subscribe(res => {
      console.log(res);
    });
  }

  inserisciProdotto(){
    this.prodService.addProduct(this.prodotto);
  }

}