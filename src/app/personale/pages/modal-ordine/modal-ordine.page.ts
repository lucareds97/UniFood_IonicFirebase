import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { OrdiniService } from 'src/app/services/service_personale/ordini.service';
import { Ordine } from 'src/app/interfaces/ordini';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { ProductsService } from 'src/app/services/service_personale/products.service';

@Component({
  selector: 'app-modal-ordine',
  templateUrl: './modal-ordine.page.html',
  styleUrls: ['./modal-ordine.page.scss'],
})
export class ModalOrdinePage implements OnInit {

  id: any;
  ordine: Ordine = {
    dataOrdine: '',
    prezzo: 0,
    stato: false,
    idCliente: '',
    prodotti: [],
    idSede: '',
    isChecked: false,
    tipologia: '',
  };

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
    tipo: ''

  };

  listaOrdini: Ordine[] = [];

  listaProdotti: Prodotto[] = [];


  constructor(private navParams: NavParams, private ordiniService: OrdiniService, private modalController: ModalController, private prodService: ProductsService) { }

  ngOnInit() {
    this.id = this.navParams.get('custom_id');
    this.listaProdotti = this.navParams.get('custom_listaProdotti');
    this.getOrdine();
    // this.getProdotti();
  }

  closeModal() {
    this.modalController.dismiss();
  }


  getOrdine() {
    this.ordiniService.getOrdine(this.id).subscribe(res => {
      this.ordine = res;
    });
  }

  // getProdotti() {
  //   this.prodService.getProducts().subscribe(res => {
  //     this.listaProdotti= res;
  //   });
  // }
}
