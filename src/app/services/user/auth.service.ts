import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Utente } from 'src/app/interfaces/utente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  usersCollection: AngularFirestoreCollection<Utente>;
  users: Observable<Utente[]>;

  id: any;
  tipo: string;


  utente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
  };

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection<Utente>('userProfile');
 
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }


  signupUser(email: string, password: string, tipo: string): Promise<any> {
    
    console.log(tipo);

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {


        
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email, password, tipo});
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }


  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }

  getUserId() {
    this.id = firebase.auth().currentUser.uid;
    console.log(this.id)
    return this.id;
  }

  getUserData() {
    
    const id = firebase.auth().currentUser.uid;
    this.usersCollection.doc<Utente>(id).valueChanges().subscribe(res =>{
      this.utente = res;
      console.log('asdasd' + this.utente);
      return this.utente;
    });

    
  }
}
