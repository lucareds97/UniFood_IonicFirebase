import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  constructor(private db: AngularFirestore) {
    this.productsCollection = db.collection<Product>('products');
 
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

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  getProduct(id: string): Observable<Product> {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  addProduct(product: Product): Promise<DocumentReference> {
    return this.productsCollection.add(product);
  }

  updateProduct(product: Product, id: string): Promise<void> {
    return this.productsCollection.doc(id).update(product);
  }

  removeProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }

}
