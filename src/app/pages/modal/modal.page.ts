import { Component, OnInit } from '@angular/core';
import { Prodotto } from 'src/app/interfaces/prodotti';

import { NavParams, ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
  };

id: any;
  constructor(private prodService: ProductsService, private navParams: NavParams, private modalController: ModalController) { }

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
}
