import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../interfaces/prodotti';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-visualizza-prodotto',
  templateUrl: './visualizza-prodotto.page.html',
  styleUrls: ['./visualizza-prodotto.page.scss'],
})
export class VisualizzaProdottoPage implements OnInit {

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
  };


  id: any;

  constructor(private prodService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router,public alertController: AlertController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProdotto();
  }
  
  getProdotto(){
    this.prodService.getProduct(this.id).subscribe(res =>{
      this.prodotto = res;
      console.log(this.prodotto);
    });
  }

  modificaProdottoDaScheda(id){
    this.router.navigateByUrl('/tabs/lista-prodotti/modifica-prodotto/' + id);
  }

  rimuoviProdotto(id){
    this.router.navigateByUrl('/tabs/lista-prodotti');
    this.prodService.removeProduct(id);
  }

  async presentAlertConfirm() {
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
            this.rimuoviProdotto(this.id);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
