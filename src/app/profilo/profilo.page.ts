import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { Utente } from 'src/app/interfaces/utente';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profilo',
  templateUrl: 'profilo.page.html',
  styleUrls: ['profilo.page.scss']
})
export class ProfiloPage implements OnInit {

  utente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
  };
  id: any;
  email: string;
  password: any;
  type: any;
  
  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController,){
    let categoria: string;

  }

  

  logout(){
    this.authService.logoutUser();
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {

    this.getDatiUtente();
  }

  modificaProfilo() {
    this.id = this.authService.getUserId();
    this.router.navigateByUrl('cliente/profilo/modifica-profilo');
  }

  changeEmail(){
    this.authService.changeEmail('p.prioriello@gmail.com');   
  }

  changePassword(){
    this.authService.changePassword(this.utente.email).then(
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Controlla la tua mail per reimpostare la password',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                this.router.navigateByUrl('login');
              },
            },
          ],
        });
        await alert.present();
      },
      async error => {
        const errorAlert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await errorAlert.present();
      }
    
    );
  }

  getDatiUtente(){

    this.authService.userDataPromise().then((utente) => {
      this.utente = utente;

      switch (this.utente.tipo) {

        case '1':
            this.type = 'Cliente:';
          break;
  
        case '2':
            this.type = 'Personale:';
          break;
  
        case '3':
            this.type = 'Amministratore:';
          break;
  
        
      }

    })

  }
}

