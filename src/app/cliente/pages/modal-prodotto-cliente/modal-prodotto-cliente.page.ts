import { Component, OnInit, ViewChild } from '@angular/core';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/service_personale/products.service';
import { AlertController, NavParams, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { CartService } from 'src/app/services/service_cliente/cart.service';

@Component({
  selector: 'app-modal-prodotto-cliente',
  templateUrl: './modal-prodotto-cliente.page.html',
  styleUrls: ['./modal-prodotto-cliente.page.scss'],
})
export class ModalProdottoClientePage implements OnInit { 

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
    tipo: ''
  };

  id: any;

  constructor(private router: Router, private cartService: CartService, private prodService: ProductsService,  public alertController: AlertController, private navParams: NavParams, private modalController: ModalController) { }

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

  addToCart(id) {
    this.prodService.getProduct(id).subscribe(res =>{
      this.prodotto = res;
      this.cartService.addProduct(this.prodotto);
      console.log(res);
    });

  }
  
  aggiungiAlCarrello(prodotto) {
    this.cartService.addProduct(prodotto);
    }
  
    
    async presentAlertConfirm(id: string) {
      const alert = await this.alertController.create({
        header: 'Vuoi aggiungere il prodotto al carrello?',
        buttons: [
          {
            text: 'ANNULLA',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (annullato) => {
            console.log('Confirm Cancel: annullato');
            } }, 
          {
            text: 'AGGIUNGI',
            handler: () => {
              this.closeModal();
              this.aggiungiAlCarrello(this.prodotto);
              console.log('Aggiunto');
            }
          }
        ]
      });
  
      await alert.present();
  
  }

}
