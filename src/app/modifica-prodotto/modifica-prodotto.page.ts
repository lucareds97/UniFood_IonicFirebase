import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../interfaces/prodotti';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifica-prodotto',
  templateUrl: './modifica-prodotto.page.html',
  styleUrls: ['./modifica-prodotto.page.scss'],
})
export class ModificaProdottoPage implements OnInit {

  constructor(private prodService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
  };

  id: any;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProdotto();
  }

  getProdotto(){
    this.prodService.getProduct(this.id).subscribe(res => {
      this.prodotto = res;
      console.log(this.prodotto);
    });
  }

  modificaProdotto(){
    this.prodService.updateProduct(this.prodotto, this.id);
    this.router.navigateByUrl('/tabs/lista-prodotti');
  }

}
