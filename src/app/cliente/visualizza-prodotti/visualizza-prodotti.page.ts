import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AlertController, ModalController } from '@ionic/angular';
import { Prodotto } from 'src/app/interfaces/prodotti';
import { ProductsService } from 'src/app/services/service_personale/products.service';
import { Router } from '@angular/router';
import { ModalProdottoClientePage } from 'src/app/cliente/pages/modal-prodotto-cliente/modal-prodotto-cliente.page';
import { AuthService } from 'src/app/services/user/auth.service';
import { CartService } from 'src/app/services/service_cliente/cart.service';

@Component({
  selector: 'app-visualizza-prodotti',
  templateUrl: 'visualizza-prodotti.page.html',
  styleUrls: ['visualizza-prodotti.page.scss'],
})
export class VisualizzaProdottiPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  i: number = 0;
  listaProdotti: any[] = [];
  listaProdottiFiltrata: any[] = [];
  listaProdottiSearch: any[] = [];


  public tipo: string = "Tutti";

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

  carrello = [];
  items = [];

  constructor(private cartService: CartService, private authService: AuthService, private prodService: ProductsService, private router: Router, public alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.getDatiUtente();
    this.getProdotti();

    // this.carrello = this.carrelloService.getCart();
    // this.items = this.carrelloService.getProducts();
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

  aggiungiAlCarrello(prodotto) {
    this.cartService.addProduct(prodotto);
  }

  apriCarrello() {
    this.router.navigate(['carrello']);
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