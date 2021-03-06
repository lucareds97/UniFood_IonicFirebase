import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/service_personale/products.service';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Prodotto } from '../../interfaces/prodotti';
import { AlertController } from '@ionic/angular';

import { NavParams } from '@ionic/angular';

import { ModalPage } from '../pages/modal/modal.page'
import { AuthService } from 'src/app/services/user/auth.service';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { subscribeOn } from 'rxjs/operators';



@Component({
  selector: 'app-lista-prodotti',
  templateUrl: 'lista-prodotti.page.html',
  styleUrls: ['lista-prodotti.page.scss'],



})


export class ListaProdottiPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;



  public tipo: string = "Tutti";

  i: number = 0;
  listaProdotti: any[] = [];
  listaProdottiFiltrata: any[] = [];
  listaProdottiSearch: any[] = [];

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
    tipo: ''

  };

  id: any;
  value = 0;
  public text: string = "";

  constructor(private prodService: ProductsService, private authService: AuthService, private router: Router, public alertController: AlertController, private modalController: ModalController) {
  }

  ngOnInit() {
    this.getProdotti();
    this.getDatiUtente();
  }

  getDatiUtente(){
    this.authService.userDataPromise();
  }

  getProdotti() {
    this.prodService.getProducts().subscribe(res => {
      this.listaProdotti = res;
      this.listaProdottiFiltrata = res;

    });
  }


  aggiungiNuovoProdotto() {
    this.router.navigateByUrl('/personale/lista-prodotti/nuovo-prodotto');
  }

  rimuoviProdotto(id) {
    console.log("ciao");
    this.prodService.removeProduct(id);
  }

  modificaProdotto(id) {
    this.router.navigateByUrl('/personale/lista-prodotti/modifica-prodotto/' + id);
  }

  visualizzaSchedaProdotto(id) {
    this.router.navigateByUrl('/personale/lista-prodotti/visualizza-prodotto/' + id);
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Rimuovere il prodotto?',
      message: 'Così facendo il prodotto verrà <strong>definitivamente</strong> eliminato dal database!!!',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Rimuovi',
          handler: () => {
            this.rimuoviProdotto(id);
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




  filtraProdotti() {

    const searchKeyLowered = this.tipo.toLowerCase();

    if (this.tipo !== '') {
      switch (this.tipo) {

        case 'Primo piatto':
            this.listaProdottiFiltrata = this.listaProdotti.filter(prodotto => prodotto.tipo.toLowerCase().search(searchKeyLowered) == 0);
            this.listaProdottiSearch = this.listaProdottiFiltrata;
            console.log(this.listaProdotti);
          break;

        case 'Secondo piatto':
            this.listaProdottiFiltrata = this.listaProdotti.filter(prodotto => prodotto.tipo.toLowerCase().search(searchKeyLowered) == 0);
            this.listaProdottiSearch = this.listaProdottiFiltrata;
            console.log(this.listaProdotti);
          break;

        case 'Bibita':
            this.listaProdottiFiltrata = this.listaProdotti.filter(prodotto => prodotto.tipo.toLowerCase().search(searchKeyLowered) == 0);
            this.listaProdottiSearch = this.listaProdottiFiltrata;
            console.log(this.listaProdotti);
          break;

        case 'Tutti':
          this.getProdotti();
          this.listaProdottiFiltrata = this.listaProdotti;
          console.log(this.listaProdotti);
          break;

        default:
          break;
      }

    }

  }

  search() {
    if (this.text !== '') {
      const searchKeyLowered = this.text.toLowerCase();
      this.listaProdottiFiltrata = this.listaProdottiSearch.filter(prodotto => prodotto.nome.toLowerCase().search(searchKeyLowered) >= 0);
    } else {
      this.listaProdottiFiltrata = this.listaProdottiSearch;
    }
  }
}


