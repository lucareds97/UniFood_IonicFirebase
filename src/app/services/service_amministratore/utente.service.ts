import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Utente } from 'src/app/interfaces/utente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  usersCollection: AngularFirestoreCollection<Utente>;
  listUsers: Observable<Utente[]>;

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection<Utente>('userProfile');
 
    this.listUsers = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getListaUtente(): Observable<Utente[]> {
    return this.listUsers;
  }

}
