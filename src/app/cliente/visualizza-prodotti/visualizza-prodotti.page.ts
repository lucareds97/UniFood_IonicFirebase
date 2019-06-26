import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AlertController, ModalController } from '@ionic/angular';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { ProductsService } from 'src/app/services/service_personale/products.service';
import { Router } from '@angular/router';
import {ModalProdottoClientePage} from 'src/app/cliente/pages/modal-prodotto-cliente/modal-prodotto-cliente.page';

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

  constructor(private prodService: ProductsService, private router: Router, public alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.prodService.getProducts().subscribe(res => {
      this.visualizzaProdotti = res;

    });

}
// visualizzaSchedaProdotto(id) {
//     this.router.navigateByUrl('/cliente/visualizza-prodotti/visualizza-prodotto/' + id);
//   }

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
}