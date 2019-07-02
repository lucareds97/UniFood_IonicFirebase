import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Utente } from 'src/app/interfaces/utente';
import { map } from 'rxjs/operators';
import { CartService } from '../service_cliente/cart.service';

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
    idUtente: '',
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

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }


  changePassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  changeEmail(email){
    return firebase.auth().currentUser.updateEmail(email);
  }



  signupUser(email: string, password: string, nome: string, cognome: string, tipo: string): Promise<any> {

    console.log(tipo);

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {



        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email, password, nome, cognome, tipo });

      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });


  }

  updateProfile(user: Utente, id: string): Promise<void> {
    return this.usersCollection.doc(id).update(user);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getUserId() {
    this.id = firebase.auth().currentUser.uid;
    return this.id;
  }

  
  userDataPromise(): Promise<any> {
      const id = firebase.auth().currentUser.uid;
      return new Promise((resolve, reject) => {
        this.usersCollection.doc<Utente>(id).valueChanges().subscribe(res => {
          this.utente = res;
          resolve(this.utente);
        });
      });
  }
  
  deleteUser(id: any) {
    this.id = id;
    console.log(this.id);
    this.usersCollection.doc<Utente>(id).delete();
    //firebase.auth().currentUser.delete();
  }
  
}
