import { Component, OnInit } from '@angular/core';
import { OrdiniService } from '../../services/service_personale/ordini.service';
import { Ordine } from '../../interfaces/ordini';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordini',
  templateUrl: 'ordini.page.html',
  styleUrls: ['ordini.page.scss']
})
export class OrdiniPage {

  listaOrdini: any[] = []

  ordine: Ordine = {
    dataOrdine: '',
    orarioOrdine: '',
    prezzoTotale: '',
    stato: false,
    idCliente: '',
    idProdotto: '',
    idSede: '',
  }

  whichPage = 'non-completati'
  isChecked: boolean = false;

  constructor(private ordiniService: OrdiniService, private alertController: AlertController, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.ordiniService.getOrdini().subscribe(res => {
      this.listaOrdini = res;
      console.log(this.listaOrdini);
    });;
  }

  cambiaStato(ordine) {
    ordine.stato = true;
    this.ordiniService.updateOrdine(ordine, ordine.id);
  }

  async presentAlertConfirm(ordine) {
    const alert = await this.alertController.create({
      header: 'Confermare ritiro?',
      message: 'Così facendo l\'ordine verrà inserito nella lista degli ordini completati.',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.isChecked = false;
            console.log(this.isChecked)
          }
        }, {
          text: 'Conferma',
          handler: () => {
            this.cambiaStato(ordine);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}

