import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Prodotto } from '../interfaces/prodotti';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovo-prodotto',
  templateUrl: 'nuovo-prodotto.page.html',
  styleUrls: ['nuovo-prodotto.page.scss']
})
export class NuovoProdottoPage{

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: '',
    linkImmagine: '',
  };

  constructor(private prodService: ProductsService, public alertController: AlertController, private router: Router) {
   }


  inserisciProdotto(){
    if(this.prodotto.nome == '' || this.prodotto.descrizione == '' || this.prodotto.prezzo == '' || this.prodotto.nome == ''){
      console.log("INSERIRE TUTTI I CAMPI!");
    }else{
    this.prodService.addProduct(this.prodotto);
    this.router.navigateByUrl("/lista-prodotti");
  }
}

}