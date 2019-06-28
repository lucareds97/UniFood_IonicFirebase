import { Component, OnInit } from '@angular/core';
import { CarrelloService } from 'src/app/services/service_cliente/carrello.service';
import { Router } from '@angular/router';
import {Prodotto} from 'src/app/interfaces/prodotti';
@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit {


  selectedItems = [];
  total = 0;


  constructor(private carrelloService: CarrelloService, private router: Router) { }

 

  ngOnInit() {

    //this.carrelloService.getCart();
      // let items = this.carrelloService.getCart();
      // let selected = {};
      // for(let obj of items){
      //   if (selected[obj.id]){
      //     selected[obj.id].count++;
      //   }else{
      //     selected[obj.id] = {...obj, count:1};
      //   }
      // }
    
      // this.selectedItems = Object.keys(selected).map(key => selected[key])
      // console.log('items: ', this.selectedItems);
      //his.total = this.selectedItems.reduce((a,b) => a + (b.count * b.price),0);

  }

  

}
