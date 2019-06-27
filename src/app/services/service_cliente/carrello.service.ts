import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Carrello } from 'src/app/interfaces/carrello';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  carrelloCollection: AngularFirestoreCollection<Carrello>;
  prodotti: Observable<Carrello[]>;


  public carrello = [];
  public data = [];

  constructor() { }

  getProducts(){
  return this.data;
  }

  getCart(){
    return this.carrello;
  }

  addProduct(product){
    this.carrello.push(product);
    console.log(this.carrello);
  }
}
