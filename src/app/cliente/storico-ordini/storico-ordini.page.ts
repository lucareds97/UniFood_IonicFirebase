import { Component, OnInit } from '@angular/core';
import { Ordine } from 'src/app/interfaces/ordini';
import { OrdiniService } from 'src/app/services/service_personale/ordini.service';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Utente } from 'src/app/interfaces/utente';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/user/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storico-ordini',
  templateUrl: './storico-ordini.page.html',
  styleUrls: ['./storico-ordini.page.scss'],
})
export class StoricoOrdiniPage implements OnInit {
  usersCollection: AngularFirestoreCollection<Utente>;
  users: Observable<Utente[]>;

  listaOrdini: Ordine[];

  idCliente: string;

  ordine: Ordine = {
    dataOrdine: '',
    prezzo: 0,
    stato: false,
    idCliente: '',
    prodotti: [],
    idSede: '',
    isChecked: false,
    tipologia: '',
  }

  utente: Utente;

  constructor(private router: Router, private ordiniService: OrdiniService,  private modalController: ModalController, private authService: AuthService, public alertController: AlertController) {
  }

  ionViewWillEnter() {
    this.getOrdini();
  }

  ngOnInit() {
  }

  getOrdini() {

    this.listaOrdini = [];

    this.ordiniService.getOrdini().subscribe(listaOrdini => {

      this.idCliente = this.authService.getUserId();

      for (let ordine of listaOrdini) {
        if (this.idCliente == ordine.idCliente) {

          this.listaOrdini.push(ordine);
        }
      }
      console.log(this.listaOrdini);
    });

  }

  convertDate(data: string) {
    return new Date(data);
  }

  eliminaOrdine(id: string){
    if(this.listaOrdini.length != 0){
    this.ordiniService.removeOrdine(id);
    this.getOrdini();
    console.log(id)
  }else{
    this.router.navigateByUrl("/cliente/profilo");
  }
  }

  closeModal(){
    this.modalController.dismiss();
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Vuoi annullare l\'ordine?',
      buttons: [
        {
          text: 'ANNULLA',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (annullato) => {
          console.log('Confirm Cancel: annullato');
          } }, 
        {
          text: 'ELIMINA',
          handler: () => {
            this.closeModal();
            this.eliminaOrdine(id);
            console.log('Aggiunto');
          }
        }
      ]
    });

    await alert.present();

}

}
