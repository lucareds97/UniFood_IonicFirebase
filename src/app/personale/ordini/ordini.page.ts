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

@Component({
  selector: 'app-ordini',
  templateUrl: 'ordini.page.html',
  styleUrls: ['ordini.page.scss']
})
export class OrdiniPage {

  listaOrdini: Ordine[] = [];
  listaPrimi: Ordine[] = [];
  listaSecondi: Ordine[] = [];
  listaBibite: Ordine[] = [];

  idProdotto: string;
  
  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
    tipo: '',
  };

  whichPage = 'non-completati'
  whichType = 'Tutti'

  constructor(private ordiniService: OrdiniService, private prodService: ProductsService, private authService: AuthService, private alertController: AlertController, private navCtrl: NavController, private modalController: ModalController) {
  }

  ngOnInit() { 

    this.getDatiUtente(); 

    this.getOrdini();

  }

  setWhichType(tipo: string){
    this.whichType = tipo;
    console.log(this.whichType);
  }


  getOrdini(){
    this.ordiniService.getOrdini().subscribe(res => {
      this.listaOrdini = res;
      
      console.log(this.listaOrdini);

      for(let ordine of this.listaOrdini){  // IL PROBLEMA DOVREBBE ESSERE QUI, È COME SE CI FOSSE UN SOLO ORDINE ANCHE SE NON È COSÌ
  
        this.prodService.getProduct(ordine.idProdotto).subscribe(res =>{
          this.prodotto = res;

          switch (this.prodotto['tipo']) {

            case 'Primo piatto':
              this.listaPrimi.push(ordine);
              break;
  
            case 'Secondo piatto':
              this.listaSecondi.push(ordine);
              break;
  
            case 'Bibita':
              this.listaBibite.push(ordine);
              break;
  
            default:
              break;
          }
          
        })
      }
    })


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

}

