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
    prezzo: '',
    linkImmagine: '',

  };

  constructor(private prodService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    this.prodService.getProducts().subscribe(res => {
      //console.log(res);

      res.forEach(id => {

        this.prodotto.nome = res[this.i]['nome'];
        this.prodotto.descrizione = res[this.i]['descrizione'];
        this.prodotto.prezzo = res[this.i]['prezzo'];
        this.prodotto.linkImmagine = res[this.i]['linkImmagine'];
        
        this.listaProdotti.push(res[this.i]);

        console.log("ITERATA" + this.i);
        console.log(this.listaProdotti[this.i]);

        this.i++;

      });

    });
  }

  aggiungiNuovoProdotto(){
    this.router.navigateByUrl('/tabs/lista-prodotti/nuovo-prodotto');
  }

}
