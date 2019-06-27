import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Utente } from 'src/app/interfaces/utente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaleService {

  // listaUtente: Observable<Utente[]>;
  // listaPersonale: Utente[] = [];

  constructor() { }

  getPersonale(arrayUtenti) {
    let arrayFiltro = [];
    arrayUtenti.forEach(prodotto => {
      if (prodotto['tipo'] == '2') {
        arrayFiltro.push(prodotto);
      }
    });
    return arrayFiltro;
  }
}
