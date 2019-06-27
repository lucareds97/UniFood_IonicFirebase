import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/service_personale/products.service';
import { Prodotto } from '../../interfaces/prodotti';
import { AlertController, ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PickerOptions, PickerButton } from '@ionic/core';
import { PickerController } from '@ionic/angular';

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
    tipo: '',
  };
  framework = '';
  constructor(private pickerCtrl: PickerController, private prodService: ProductsService, public alertController: AlertController,  private toastCtrl: ToastController, private router: Router) {
   }


  inserisciProdotto(){
    if(this.prodotto.nome == '' || this.prodotto.descrizione == '' || this.prodotto.prezzo == 0 || this.prodotto.nome == '' || this.prodotto.tipo ==''){
      this.presentAlert();
    }else{
    this.prodService.addProduct(this.prodotto);
    this.router.navigateByUrl("/personale/lista-prodotti");

    this.prodotto.nome = "";
    this.prodotto.descrizione = "";
    this.prodotto.prezzo = 0;
    this.prodotto.linkImmagine = "";
    this.prodotto.tipo = "";
    
  }
}

async scegliTipo() {
  let opts: PickerOptions = {
    buttons: [
      {
        text: 'Annulla',
        role: 'cancel'
      },
      {
        text: 'Scegli'
      }
    ],
    columns: [
      {
        name: 'tipo',
        options: [
          { text: 'Primo piatto', value: 'A' },
          { text: 'Secondo piatto', value: 'B' },
          { text: 'Bibita', value: 'C' }
        ]
      }
    ]
  };
  let picker = await this.pickerCtrl.create(opts);
  picker.present();
  picker.onDidDismiss().then(async data => {
    let col = await picker.getColumn('tipo');
    this.prodotto.tipo = col.options[col.selectedIndex].text;
  });
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