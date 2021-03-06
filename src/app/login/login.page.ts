import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';
import { Utente } from '../interfaces/utente';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  utente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
    idUtente: '',
  };

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
  if (!loginForm.valid) {
    console.log('Form is not valid yet, current value:', loginForm.value);
  } else {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.authService.loginUser(email, password).then(() => {
      
      this.authService.userDataPromise().then((utente) => {
        this.utente = utente;
        
        console.log(this.utente);

        this.loading.dismiss().then(() => {

          let categoria: string;
  
  
          switch (this.utente.tipo) {
  
            case '1':
              categoria = 'cliente';
              break;
  
            case '2':
              categoria = 'personale';
              break;
  
            case '3':
              categoria = 'amministratore';
              break;
  
            default:
              categoria = 'personale';
              break;
          }
          this.router.navigateByUrl(`/${categoria}`);
          
        })

      });
      },
      error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({
            message: 'Impossibile effettuare l\'accesso!\n\n Nessun utente con le credenziali specificate presente nel database!',
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await alert.present();
        });
      }
    )
  }
}




  ngOnInit() {
  }


}
