import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
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

  constructor(private utenteService: UtenteService) { }

  getPersonale(arrayUtenti) {
    let arrayFiltro = [];
    arrayUtenti.forEach(personale => {
      if (personale['tipo'] == '2') {
        console.log(personale.id);
        arrayFiltro.push(personale);
      }
    });
    return arrayFiltro;
  }

}
