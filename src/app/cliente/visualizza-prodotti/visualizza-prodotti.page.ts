import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AlertController, ModalController } from '@ionic/angular';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { ProductsService } from 'src/app/services/service_personale/products.service';
import { Router } from '@angular/router';
import {ModalProdottoClientePage} from 'src/app/cliente/pages/modal-prodotto-cliente/modal-prodotto-cliente.page';
import { AuthService } from 'src/app/services/user/auth.service';
import { CarrelloService } from 'src/app/services/service_cliente/carrello.service';

@Component({
  selector: 'app-visualizza-prodotti',
  templateUrl: 'visualizza-prodotti.page.html',
  styleUrls: ['visualizza-prodotti.page.scss'],
})
export class VisualizzaProdottiPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  i: number = 0;
  visualizzaProdotti: any[] = [];

    prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',

  };

  id: any;
  value = 0;

  carrello = [];
  items = [];

  constructor(private carrelloService: CarrelloService, private authService:AuthService, private prodService: ProductsService, private router: Router, public alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.getDatiUtente();
    this.getProdotti();

    this.carrello = this.carrelloService.getCart();
    this.items = this.carrelloService.getProducts();
  }

  getProdotti(){
    this.prodService.getProducts().subscribe(res => {
      this.visualizzaProdotti = res;

    });
  }

  getDatiUtente(){
    this.authService.getUserData();
  }

  async openModal2(id) {
    console.log(id);
    const modal = await this.modalController.create({
      component: ModalProdottoClientePage,
      componentProps: {
        custom_id: id
      }
    });
    await modal.present();
  }
  aggiungiAlCarrello(prodotto){
    this.carrelloService.addProduct(prodotto);
  }

  apriCarrello(){
    this.router.navigate(['carrello']); 
  }

}