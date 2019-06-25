import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }


  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }


  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }
  
}
