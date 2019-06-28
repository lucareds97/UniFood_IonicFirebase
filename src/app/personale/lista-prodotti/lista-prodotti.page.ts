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


  i: number = 0;
  listaProdotti: Prodotto[] = [];

  //   prodotto: Prodotto = {
  //   nome: '',
  //   descrizione: '',
  //   prezzo: 0,
  //   linkImmagine: '',
  //   tipo: ''

  // };

  id: any;
  value = 0;
  index : any;

  

  

  constructor(private prodService: ProductsService, private authService: AuthService, private router: Router, public alertController: AlertController, private modalController: ModalController) {
  }

  ngOnInit() {
    this.getProdotti();
    this.getDatiUtente();
  }

  getProdotti(){
    this.prodService.getProducts().subscribe(res => {
      this.listaProdotti = res;

    });
  }

  getDatiUtente(){
    this.authService.getUserData();
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


  getListaProdotti($event) {

   let text = event.target.value;
   console.log(this.listaProdotti);
      
    this.prodService.getProducts().subscribe((res)=>{
    
      this.listaProdotti = this.getProdotto(res);
      console.log(this.listaProdotti);
      return this.listaProdotti;
    });
   }

  getProdotto(array) {
    let ar = [];
    array.forEach(element => {
      if (element['nome'] == "acqua") {
        ar.push(element);
      }
    });
    return ar;
  }



  getInputElement($event){
  

      let text = event.target.value;
      console.log(text);
      console.log(this.listaProdotti);


     

      // if(!text){
      //   this.getProdotti();
      // }

      // this.listaProdotti = this.listaProdotti.filter((text) =>{
      //   if(this.prodotto.nome && text.trim() !=''){
      //     console.log(this.prodotto.nome);
      //     return(this.prodotto.nome.toLowerCase().indexOf(text.toLowerCase()) > -1)
          
          

      //   }
      // });

      // console.log(text, this.listaProdotti);
   
    }

   


    
      

      

    

} 



