import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Carrello } from 'src/app/interfaces/carrello';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  cartCollection: AngularFirestoreCollection<Carrello>;
  cart: Observable<Carrello[]>;


  

  constructor(private db: AngularFirestore) {
    this.cartCollection = db.collection<Carrello>('carrello');

    
    this.cart = this.cartCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  

   }

   getProducts(): Observable<Carrello[]> {
    return this.cart;
  }

  getCart(): Observable<Carrello[]> {
    return this.cart;
  }

  addProduct(cart: Carrello): Promise<DocumentReference> {
    return this.cartCollection.add(cart);

 
  }

  
}
