import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Prodotto } from '../../interfaces/prodotti';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  search(nome: string) {
    throw new Error("Method not implemented.");
  }

  productsCollection: AngularFirestoreCollection<Prodotto>;
  products: Observable<Prodotto[]>;

  constructor(private db: AngularFirestore) {
    this.productsCollection = db.collection<Prodotto>('prodotto');
 
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getProducts(): Observable<Prodotto[]> {
    return this.products;
  }

  getProduct(id: string): Observable<Prodotto> {
    return this.productsCollection.doc<Prodotto>(id).valueChanges();
  }

  getProductType(id:string): Observable<string>{
    return this.productsCollection.doc<Prodotto['tipo']>(id).valueChanges();
  }

  addProduct(product: Prodotto): Promise<DocumentReference> {
    return this.productsCollection.add(product);
  }

  updateProduct(product: Prodotto, id: string): Promise<void> {
    return this.productsCollection.doc(id).update(product);
  }

  removeProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }

}
