import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Carrello } from 'src/app/interfaces/carrello';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartsCollection: AngularFirestoreCollection<Carrello>;
  carts: Observable<Carrello[]>;


  cart = [];


  idCarrello: string;

  carrello: Carrello = {
    Prezzo: 0,
    idCliente: '',
    prodotti: []
    };

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.cartsCollection = db.collection<Carrello>('carrello');
 
    this.carts = this.cartsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }


  //GESTIONE NEL CODICE CON ARRAY 

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }

  removeProduct(product) {
    this.cart.splice(product, 1);
  }

  removeAllProducts(){
    this.cart = [];
    console.log(this.cart);
  }


  //GESTIONE CON OBSERVABLE E SINCRONIZZAZIONE DATABASE - DA CONTINUARE

  getCarts(): Observable<Carrello[]> {
    return this.carts;
  }

  //RIPESCARE ID CARRELLO
  getCarrello(): Observable<Carrello> {
    return this.cartsCollection.doc<Carrello>('QuiCiVaIdCarrello').valueChanges();
 }

  updateCart(idCarrello: string) {
    return this.cartsCollection.doc<Carrello>('QuiCiVaIdCarrello').update(this.carrello);
  }

  addProdotto(product, idCarrello: string) {
    this.carrello.prodotti.push(product);
    this.updateCart(idCarrello);
  }

  //AL MOMENTO DEL SIGNUP VIENE CREATO UN NUOVO CARRELLO PER IL NUOVO CLIENTE
  //FORSE CONVERREBBE ASSEGNARE LO STESSO ID DEL CLIENTE AL CARRELLO CREATO, PROBLEMA CON ID DI FIREBASE
  //GESTIRE IN sign.up.page.ts
  addCart(): Promise<DocumentReference> {
    return this.cartsCollection.add(this.carrello);
  }


}
