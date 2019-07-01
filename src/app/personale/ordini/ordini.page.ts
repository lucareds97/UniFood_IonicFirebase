import { Component, OnInit } from '@angular/core';
import { OrdiniService } from '../../services/service_personale/ordini.service';
import { Ordine } from '../../interfaces/ordini';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { ProductsService } from 'src/app/services/service_personale/products.service';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { ModalPage } from '../pages/modal/modal.page';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Utente } from 'src/app/interfaces/utente';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordini',
  templateUrl: 'ordini.page.html',
  styleUrls: ['ordini.page.scss']
})
export class OrdiniPage {
  usersCollection: AngularFirestoreCollection<Utente>;
  users: Observable<Utente[]>;

  listaOrdini: Ordine[] = [];
  listaOrdiniFiltrata: Ordine[] = [];

  idProdotto: string;
  nomeProdotto: string;

  i: any;

 ordine: Ordine = {
    dataOrdine: '',
    orarioOrdine: '',
    prezzoTotale: '',
    stato: false,
    idCliente: '',
    idProdotto: '',
    idSede: '',
    isChecked: false,
    tipologia: '',
}


  whichPage = 'non-completati'
  public tipo: string = "Tutti";

  constructor(private db: AngularFirestore, private ordiniService: OrdiniService, private utenteService: UtenteService, private prodService: ProductsService, private authService: AuthService, private alertController: AlertController, private navCtrl: NavController, private modalController: ModalController) {
    this.usersCollection = db.collection<Utente>('userProfile');
  }

  ngOnInit() {

    this.getOrdini();

    this.getDatiUtente();

    this.getNomi();

  }




  getOrdini() {
    this.ordiniService.getOrdini().subscribe(res => {
      this.listaOrdini = res;
      this.listaOrdiniFiltrata = res;
    });
  }

  getNomi() {

   


    this.ordiniService.getOrdini().subscribe(res => {
      res.filter((ordine) => {
        console.log(ordine);
        this.utenteService.getProfile(ordine.idCliente.trim()).subscribe((utente) => {
          console.log(this.authService.getUserId());
          
          this.ordine.idCliente = utente.nome;
          return this.ordine;

          console.log(this.ordine.idCliente);
    //       if (ordine.idCliente == 'utente.id') {
    //         console.log(utente.nome);
    //         return ordine;
          // }
        });
      });

    });
  }


  getDatiUtente() {
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

  async openModal(id) {
    console.log(id);

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        custom_id: id
      }
    });

    await modal.present();
  }

  filtraOrdini() {

    const searchKeyLowered = this.tipo.toLowerCase();

    if (this.tipo !== '') {
      switch (this.tipo) {

        case 'Primo piatto':
          this.listaOrdini = this.listaOrdiniFiltrata.filter(ordine => ordine.tipologia.toLowerCase().search(searchKeyLowered) == 0);
          console.log(this.listaOrdini);
          break;

        case 'Secondo piatto':
          this.listaOrdini = this.listaOrdiniFiltrata.filter(ordine => ordine.tipologia.toLowerCase().search(searchKeyLowered) == 0);
          console.log(this.listaOrdini);
          break;

        case 'Bibita':
          this.listaOrdini = this.listaOrdiniFiltrata.filter(ordine => ordine.tipologia.toLowerCase().search(searchKeyLowered) == 0);
          console.log(this.listaOrdini);
          break;

        case 'Tutti':
          this.getOrdini();
          this.listaOrdini = this.listaOrdiniFiltrata;
          console.log(this.listaOrdini);
          break;

        default:
          break;
      }



    }


  }



}

