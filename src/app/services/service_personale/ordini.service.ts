import { Injectable } from '@angular/core';
import { Ordine } from '../../interfaces/ordini';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {

  ordiniCollection: AngularFirestoreCollection<Ordine>;
  ordini: Observable<Ordine[]>;

  constructor(private db: AngularFirestore) {
    this.ordiniCollection = db.collection<Ordine>('ordini');
 
    this.ordini = this.ordiniCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getOrdini(): Observable<Ordine[]> {
    return this.ordini;
  }

  getOrdine(id: string): Observable<Ordine> {
    return this.ordiniCollection.doc<Ordine>(id).valueChanges();
  }

  addOrdine(ordine: Ordine): Promise<DocumentReference> {
    return this.ordiniCollection.add(ordine);
  }

  updateOrdine(ordine: Ordine, id: string): Promise<void> {
    return this.ordiniCollection.doc(id).update(ordine);
  }

  removeOrdine(id: string): Promise<void> {
    return this.ordiniCollection.doc(id).delete();
  }

  changeStatus(ordine: Ordine, id: string, stato: boolean): Promise<void> {
    return this.ordiniCollection.doc(id).update(ordine.stato);
  }

}