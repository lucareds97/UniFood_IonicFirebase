import { Component, OnInit } from '@angular/core';
import { OrdiniService } from '../../services/service_personale/ordini.service';
import { Ordine } from '../../interfaces/ordini';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { ProductsService } from 'src/app/services/service_personale/products.service';

@Component({
  selector: 'app-ordini',
  templateUrl: 'ordini.page.html',
  styleUrls: ['ordini.page.scss']
})
export class OrdiniPage {

  listaOrdini: Ordine[] = [];
  listaOrdiniFiltrata: Ordine[] = [];
  idProdotto: string;

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

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
    tipo: '',
  };

  whichPage = 'non-completati'
  whichType = 'Tutti'

  constructor(private ordiniService: OrdiniService, private prodService: ProductsService, private authService: AuthService, private alertController: AlertController, private navCtrl: NavController) {
  }

  ngOnInit() { 

    this.getDatiUtente(); 

    this.getOrdini();

  }


  getOrdini(){
    this.ordiniService.getOrdini().subscribe(res => {
      this.listaOrdini = res;
      //console.log(this.listaOrdini);

      for(let ordine of this.listaOrdini){
  
        this.prodService.getProduct(ordine.idProdotto).subscribe(res =>{
          this.prodotto = res;
    
          if((this.prodotto['tipo']) == 'Primo piatto'){
            this.listaOrdiniFiltrata.push(ordine);
            console.log(this.listaOrdiniFiltrata);
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

}

