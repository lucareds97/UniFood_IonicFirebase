import { Component, OnInit } from '@angular/core';

import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { Utente } from 'src/app/interfaces/utente';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  personale: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: ''
  };

  id: any;

  constructor(private authService: AuthService, private router: Router, private utenteService: UtenteService,  public alertController: AlertController, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.id = this.navParams.get('custom_id');
    this.getPersonale();
  }

  closeModal(){
    this.modalController.dismiss();
  }


  getPersonale(){
    this.utenteService.getUserCollection(this.id).subscribe(res =>{
      this.personale = res;
      console.log(res);
    });
  }

  // rimuoviProdotto(id) {  
  //   this.prodService.removeProduct(this.id);
  //   this.closeModal();
  // }

  // modificaProdotto(id) {
  //   this.closeModal();
  //   this.router.navigateByUrl('/personale/lista-prodotti/modifica-prodotto/' + this.id);
  // }

  
  // async presentAlertConfirm(id: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Rimuovere il prodotto?',
  //     message: 'Così facendo il prodotto verrà <strong>definitivamente</strong> eliminato dal database!!!',
  //     buttons: [
  //       {
  //         text: 'Annulla',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Rimuovi',
  //         handler: () => {
  //           this.rimuoviProdotto(id);
  //           console.log('Confirm Okay');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
}
