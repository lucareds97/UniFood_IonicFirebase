import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Utente } from 'src/app/interfaces/utente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  usersCollection: AngularFirestoreCollection<Utente>;
  listUsers: Observable<Utente[]>;
  listUsers2: Observable<Utente[]>;
  
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

    this.listUsers2 = this.usersCollection.snapshotChanges().pipe(
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

  getListaUtente2(): Observable<Utente[]> {
    return this.listUsers2;
  }

  getUserCollection(id: string): Observable<Utente> {
    return this.usersCollection.doc<Utente>(id).valueChanges();
  }

  addUtente(utente: Utente): Promise<DocumentReference> {
    return this.usersCollection.add(utente);
  }

  getProfile(id: string): Observable<Utente> {
    return this.usersCollection.doc<Utente>(id).valueChanges();
  }

  updateProfile(utente: Utente, id: string): Promise<void> {
    return this.usersCollection.doc(id).update(utente);
  }

}
