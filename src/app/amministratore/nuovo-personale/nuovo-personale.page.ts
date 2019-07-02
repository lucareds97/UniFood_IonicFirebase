import { Component } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-nuovo-personale',
  templateUrl: './nuovo-personale.page.html',
  styleUrls: ['./nuovo-personale.page.scss'],
})
export class NuovoPersonalePage {

  personale: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
    idUtente: '',
  };

  constructor(private authService: AuthService, private utenteService: UtenteService, private router: Router, private alertController: AlertController) { }
  inserisciPersonale() {
    this.personale['tipo'] = '2';
    if (this.personale.nome == '' || this.personale.cognome == '' || this.personale.email == '') {
      console.log(this.personale);
      this.presentAlert();
    } else {
      this.utenteService.addUtente(this.personale);
      this.router.navigateByUrl("amministratore/lista-personale");

      this.personale.nome = "";
      this.personale.cognome = "";
      this.personale.email = "";

    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attenzione!',
      subHeader: 'Personale non inserito.',
      message: 'Dei campi sono vuoti!\n Compilare tutti i campi per inserire il personale!',
      buttons: ['OK']
    });

    await alert.present();
  }

}
