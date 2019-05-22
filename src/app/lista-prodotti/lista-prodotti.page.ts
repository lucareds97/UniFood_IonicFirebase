import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-prodotti',
  templateUrl: 'lista-prodotti.page.html',
  styleUrls: ['lista-prodotti.page.scss']
})
export class ListaProdottiPage {

  constructor(private prodService: ProductsService, private router: Router) {
  }

  aggiungiNuovoProdotto(){
    this.router.navigateByUrl('/tabs/lista-prodotti/nuovo-prodotto');
  }

}

