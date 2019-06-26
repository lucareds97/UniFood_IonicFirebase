import { Component, OnInit } from '@angular/core';
import { Prodotto } from 'src/app/interfaces/prodotti';

import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/service_personale/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
  };

id: any;
  constructor(private router: Router, private prodService: ProductsService,  public alertController: AlertController, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.id = this.navParams.get('custom_id');
    this.getProdotto();
  }

  closeModal(){
    this.modalController.dismiss();
  }


  getProdotto(){
    this.prodService.getProduct(this.id).subscribe(res =>{
      this.prodotto = res;
      console.log(res);
    });
  }

  rimuoviProdotto(id) {  
    this.prodService.removeProduct(this.id);
    this.closeModal();
  }

  modificaProdotto(id) {
    this.closeModal();
    this.router.navigateByUrl('/personale/lista-prodotti/modifica-prodotto/' + this.id);
  }

  
  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Rimuovere il prodotto?',
      message: 'Così facendo il prodotto verrà <strong>definitivamente</strong> eliminato dal database!!!',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Rimuovi',
          handler: () => {
            this.rimuoviProdotto(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
