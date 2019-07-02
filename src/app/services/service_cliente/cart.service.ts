import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Carrello } from 'src/app/interfaces/carrello';
import { Observable } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { AuthService } from '../user/auth.service';
import { Utente } from 'src/app/interfaces/utente';
import { Prodotto } from 'src/app/interfaces/prodotti';
import * as firebase from 'firebase';
import { OrdiniService } from '../service_personale/ordini.service';
import { Ordine } from 'src/app/interfaces/ordini';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartsCollection: AngularFirestoreCollection<Carrello>;
  carts: Observable<Carrello[]>;


  listaCarrelli: Carrello[] = [];
  listaProdotti: Prodotto[] = []


  cart = [];
  idCarrello: string;
  idCart: string;

  prezzo: number;
  i: number;

  carrello: Carrello;

  nuovoCarrello: Carrello;

  utente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
    idUtente: '',
  };

  ordine: Ordine;


  constructor(private db: AngularFirestore, private authService: AuthService, private ordiniService: OrdiniService) {

    this.carrello = {
      prodotti: [],
      prezzo: 0,
      idCliente: ''
    };

    this.cartsCollection = db.collection<Carrello>('carrello');

    this.carts = this.cartsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log(data, id);
          return { id, ...data };
        });
      })
    );
    // this.carts.subscribe((asd) => {
    //   console.log(asd);
    // });

  }

  calcolaTotale() {
    this.prezzo = 0;
    this.i = 0;

    for (let prodotto of this.carrello.prodotti) {
      this.prezzo += this.carrello.prodotti[this.i].prezzo;
      this.i++;
    }

    return this.prezzo;
  }

  getIdCarrello(): Promise<any> {

    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      //console.log(this.getId);
      //console.log(id);

      db.collection('carrello').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          //console.log(doc.data());

          if (doc.data()['idCliente'] == this.authService.getUserId()) {
            this.idCarrello = doc.id;
            //console.log(`${doc.id} => ${doc.data()}`);
            resolve(this.idCarrello);

          }
        });
      });
    })
  }

  addProduct(product: Prodotto) {
    this.listaProdotti.push(product);

    this.carrello.prezzo = this.calcolaTotale();
    this.carrello.idCliente = this.authService.getUserId();
    this.carrello.prodotti = this.listaProdotti;

    this.getIdCarrello().then((id) => {
      this.updateCart(this.carrello, id);
    });
  }

  removeProduct(idProduct) {
    this.carrello.prodotti.splice(idProduct, 1);
    this.getIdCarrello().then((id) => {
      this.getIdCarrello().then((id) => {
        this.carrello.idCliente = this.authService.getUserId();
        this.updateCart(this.carrello, id);
      });
    });
  }

  removeAllProducts() {
    this.carrello.prodotti = [];
    this.getIdCarrello().then((id) => {
      this.listaProdotti = [];
      this.carrello.prezzo = 0;
      this.carrello.idCliente = this.authService.getUserId();
      this.updateCart(this.carrello, id);
    });
  }

  getCarrello(id: string): Observable<Carrello> {
    return this.cartsCollection.doc<Carrello>(id).valueChanges();
  }

  getCarts(): Observable<Carrello[]> {
    return this.carts;
  }

  // getCarrello(): Promise<any> {

  //   return new Promise((resolve, reject) => {

  //     const idCliente = this.authService.getUserId();

  //     this.getCarts().subscribe(res => {
  //       this.listaCarrelli = res;
  //     });

  //     for (let carrello of this.listaCarrelli) {
  //       if (carrello.idCliente = idCliente) {

  //         this.carrello.prodotti;
  //         this.carrello.prezzo = this.prezzo;
  //       }
  //     }
  //     resolve(this.carrello);
  //   })
  // }

  updateCart(carrello: Carrello, id: string) {
    return this.cartsCollection.doc<Carrello>(id).update(carrello);
  }

  addCart(): Promise<DocumentReference> {

    this.nuovoCarrello = {
      prodotti: [],
      prezzo: 0,
      idCliente: this.authService.getUserId()
    };

    return this.cartsCollection.add(this.nuovoCarrello);
  }

  confermaCarrello(){

    this.ordine = {
      dataOrdine: new Date().toDateString(),
      idCliente: this.carrello.idCliente,
      prodotti: this.carrello.prodotti,
      idSede: '10001',
      isChecked: false,
      prezzo: this.carrello.prezzo,
      stato: false,
      tipologia: ''
    }

    this.ordiniService.addOrdine(this.ordine);

    this.removeAllProducts();

  }

}
