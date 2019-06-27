import { Component, OnInit } from '@angular/core';
import { OrdiniService } from '../../services/service_personale/ordini.service';
import { Ordine } from '../../interfaces/ordini';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';

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
    isChecked: false,
  }

  whichPage = 'non-completati'

  constructor(private ordiniService: OrdiniService, private authService: AuthService, private alertController: AlertController, private navCtrl: NavController) {
  }

  ngOnInit() {

    this.getDatiUtente(); 
    this.ordiniService.getOrdini().subscribe(res => {
      this.listaOrdini = res;
      console.log(this.listaOrdini);
    });;
  }



  getDatiUtente(){
    this.authService.getUserData();
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
            ordine.isChecked = false;
            console.log(ordine.isChecked)
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

