import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { AlertController, NavParams, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.page.html',
  styleUrls: ['./modal-cliente.page.scss'],
})
export class ModalPage implements OnInit {

  cliente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: ''
  };

  id: any;

  constructor(private authService: AuthService, private router: Router, private utenteService: UtenteService, public alertController: AlertController, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.id = this.navParams.get('custom_id');
    this.getCliente();
  }

  closeModal() {
    this.modalController.dismiss();
  }


  getCliente() {
    this.utenteService.getUserCollection(this.id).subscribe(res => {
      this.cliente = res;
      console.log(res);
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Rimuovere il cliente?',
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
            this.utenteService.getUserCollection(this.id).subscribe(res => {
              this.cliente = res;
              console.log(res);
              this.authService.deleteUser(this.id);
              this.closeModal();
              console.log('Confirm Okay');
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
