import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { PersonaleService } from 'src/app/services/service_amministratore/personale.service';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { ModalController } from '@ionic/angular';
import { ModalPersonalePage } from '../pages/modal-personale/modal-personale.page';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-personale',
  templateUrl: './lista-personale.page.html',
  styleUrls: ['./lista-personale.page.scss'],
})
export class ListaPersonalePage implements OnInit {

  listaPersonale: any[] = [];

  personale: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
  };

  constructor(private router: Router, private authService: AuthService, private utenteService: UtenteService, private personaleService: PersonaleService, private modalController: ModalController) { }

  ngOnInit() {

    this.utenteService.getListaUtente2().subscribe((res) => {
      this.listaPersonale = this.personaleService.getPersonale(res);
      return this.listaPersonale;
    });

    this.getDatiUtente();

  }

  aggiungiNuovoPersonale() {
    this.router.navigateByUrl('/amministratore/lista-personale/nuovo-personale');
  }

  getDatiUtente() {
    this.authService.getUserData();
  }

  async openModalPersonale(id) {
    console.log(id);

    const modal = await this.modalController.create({
      component: ModalPersonalePage,
      componentProps: {
        custom_id: id
      }
    });

    await modal.present();
  }

}

