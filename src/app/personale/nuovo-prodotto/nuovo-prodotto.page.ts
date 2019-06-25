import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/service_personale/products.service';
import { Prodotto } from '../../interfaces/prodotti';
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
    prezzo: 0,
    linkImmagine: '',
  };

  constructor(private prodService: ProductsService, public alertController: AlertController, private router: Router) {
   }


  inserisciProdotto(){
    if(this.prodotto.nome == '' || this.prodotto.descrizione == '' || this.prodotto.prezzo == 0 || this.prodotto.nome == ''){
      this.presentAlert();
    }else{
    this.prodService.addProduct(this.prodotto);
    this.router.navigateByUrl("/personale/lista-prodotti");

    this.prodotto.nome = "";
    this.prodotto.descrizione = "";
    this.prodotto.prezzo = 0;
    this.prodotto.linkImmagine = "";
    
  }
}

async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Attenzione!',
    subHeader: 'Prodotto non inserito.',
    message: 'Dei campi sono vuoti!\n Compilare tutti i campi per inserire il prodotto!',
    buttons: ['OK']
  });

  await alert.present();
}

}