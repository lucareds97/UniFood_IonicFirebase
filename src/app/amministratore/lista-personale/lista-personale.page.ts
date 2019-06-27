import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { PersonaleService } from 'src/app/services/service_amministratore/personale.service';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';

@Component({
  selector: 'app-lista-personale',
  templateUrl: './lista-personale.page.html',
  styleUrls: ['./lista-personale.page.scss'],
})
export class ListaPersonalePage implements OnInit {

  listaPersonale: any[] = [];

  // personale: Utente = {
  //   nome: '',
  //   cognome: '',
  //   email: '',
  //   tipo: '',
  // };

  constructor(private utenteService: UtenteService, private personaleService: PersonaleService) { }

  ngOnInit() {

    this.utenteService.getListaUtente().subscribe((res) => {
      this.listaPersonale = this.personaleService.getPersonale(res);
      console.log(this.listaPersonale);
      return this.listaPersonale;
    });

  }

}
