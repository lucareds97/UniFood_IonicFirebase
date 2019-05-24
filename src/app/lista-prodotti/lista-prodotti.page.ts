import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Prodotto } from '../interfaces/prodotti';

@Component({
  selector: 'app-lista-prodotti',
  templateUrl: 'lista-prodotti.page.html',
  styleUrls: ['lista-prodotti.page.scss']
})
export class ListaProdottiPage implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  i: number = 0;
  listaProdotti: any[] = [];

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',

  };

  constructor(private prodService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    this.prodService.getProducts().subscribe(res => {
      this.listaProdotti = res;
    });
  }

  aggiungiNuovoProdotto(){
    this.router.navigateByUrl('/tabs/lista-prodotti/nuovo-prodotto');
  }

  rimuoviProdotto(id){
    this.prodService.removeProduct(id);
  }

  modificaProdotto(id){
    this.router.navigateByUrl('/tabs/lista-prodotti/modifica-prodotto/' + id);
  }

  visualizzaSchedaProdotto(id){
    this.router.navigateByUrl('/tabs/lista-prodotti/visualizza-prodotto/' + id);
  }

}
