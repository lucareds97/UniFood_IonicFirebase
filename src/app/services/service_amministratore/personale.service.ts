import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaleService {

  // listaUtente: Observable<Utente[]>;
  // listaPersonale: Utente[] = [];

  constructor() { }

  getPersonale(arrayUtenti) {
    let arrayFiltro = [];
    arrayUtenti.forEach(personale => {
      if (personale['tipo'] == '2') {
        arrayFiltro.push(personale);
      }
    });
    return arrayFiltro;
  }

}
