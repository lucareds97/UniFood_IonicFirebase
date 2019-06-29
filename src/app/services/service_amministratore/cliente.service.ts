import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }
  getCliente(arrayUtenti) {
    let arrayFiltro = [];
    arrayUtenti.forEach(cliente => {
      if (cliente['tipo'] == '1') {
        arrayFiltro.push(cliente);
      }
    });
    return arrayFiltro;
  }

}
