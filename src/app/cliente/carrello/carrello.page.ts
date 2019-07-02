import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/service_cliente/cart.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { Carrello } from 'src/app/interfaces/carrello';
import { Utente } from 'src/app/interfaces/utente';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit{

  
  selectedItems = [];
  total = 0;

  i: number;

  carrello: Carrello = {
    prezzo: 0,
    idCliente: '',
    prodotti: []
  }

  utente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
    idUtente: '',
  };

  constructor(private cartService: CartService, private authService: AuthService, public alertController: AlertController, private router: Router) {

  }

  ngOnInit(){
    this.getDatiUtente();
    this.cartService.getIdCarrello();
  }


  ionViewWillEnter() {
    this.gestioneCarrello();
  }


  getDatiUtente(){
    this.authService.userDataPromise().then((utente) => {
    this.utente = utente;
    })
  }

  gestioneCarrello() {

    let items = [];

    this.cartService.getIdCarrello().then((idCarrello)=> {

      this.cartService.getCarrello(idCarrello).subscribe(res => {
        items = res.prodotti
  
        let selected = {};
        for (let obj of items) {
    
          if (selected[obj.id]) {
            selected[obj.id].count++;
          } else {
            selected[obj.id] = { ...obj, count: 1 };
          }
        }
    
        this.selectedItems = Object.keys(selected).map(key => selected[key])
        console.log('items: ', this.selectedItems);
        this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.prezzo), 0);
      
      })
    })
  }
  
  removeProduct(idProduct) {
    this.cartService.removeProduct(idProduct);
  }

  removeAllProducts(){
    this.cartService.removeAllProducts();
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Confermare ordine?',
      message: 'I tuoi prodotti saranno presto disponibili!',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Conferma',
          handler: () => {
            this.cartService.confermaCarrello();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  

}
