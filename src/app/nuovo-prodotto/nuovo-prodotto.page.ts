import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Prodotto } from '../interfaces/prodotti';
import { AlertController, PickerController } from '@ionic/angular';
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
    prezzo: 0,
    linkImmagine: '',
  };

  constructor(private prodService: ProductsService, public alertController: AlertController, private router: Router, public pickerCtrl: PickerController) {
   }


  inserisciProdotto(){
    if(this.prodotto.nome == '' || this.prodotto.descrizione == '' || this.prodotto.prezzo == 0 || this.prodotto.nome == ''){
      console.log("INSERIRE TUTTI I CAMPI!");
    }else{
    this.prodService.addProduct(this.prodotto);
    this.router.navigateByUrl("/tabs/lista-prodotti");

    this.prodotto.nome = "";
    this.prodotto.descrizione = "";
    this.prodotto.prezzo = 0;
    this.prodotto.linkImmagine = "";
    
  }


}

} 



