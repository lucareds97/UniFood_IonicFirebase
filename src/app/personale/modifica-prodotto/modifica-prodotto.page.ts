import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../interfaces/prodotti';
import { ProductsService } from '../../services/service_personale/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PickerController, ToastController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-modifica-prodotto',
  templateUrl: './modifica-prodotto.page.html',
  styleUrls: ['./modifica-prodotto.page.scss'],
})
export class ModificaProdottoPage implements OnInit {

  constructor(private pickerCtrl: PickerController, private toastCtrl: ToastController, private prodService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    linkImmagine: '',
    tipo: ''
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
    this.router.navigateByUrl('/personale/lista-prodotti');
  }
  async scegliTipo() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        },
        {
          text: 'Scegli'
        }
      ],
      columns: [
        {
          name: 'tipo',
          options: [
            { text: 'Primo piatto', value: 'A' },
            { text: 'Secondo piatto', value: 'B' },
            { text: 'Bibita', value: 'C' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('tipo');
      this.prodotto.tipo = col.options[col.selectedIndex].text;
    });
  }
}
