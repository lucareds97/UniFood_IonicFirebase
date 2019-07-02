import { Component } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/service_cliente/cart.service';

@Component({
  selector: 'app-nuovo-personale',
  templateUrl: './nuovo-personale.page.html',
  styleUrls: ['./nuovo-personale.page.scss'],
})
export class NuovoPersonalePage {

  public signupFormPersonale: FormGroup;
  public loading: any;

  tipo: string;
  nome: string;
  cognome: string;

  personale: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
    idUtente: '',
  };

  constructor(
    private formBuilder: FormBuilder, 
    private cartService: CartService,
    private authService: AuthService, 
    private utenteService: UtenteService,
    private router: Router, 
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.signupFormPersonale = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      nome: [
        '',
        Validators.compose([Validators.required]),
      ],
      cognome: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
  }

  // inserisciPersonale() {
  //   this.personale['tipo'] = '2';
  //   if (this.personale.nome == '' || this.personale.cognome == '' || this.personale.email == '') {
  //     console.log(this.personale);
  //     this.presentAlert();
  //   } else {
  //     this.utenteService.addUtente(this.personale);
  //     this.router.navigateByUrl("amministratore/lista-personale");

  //     this.personale.nome = "";
  //     this.personale.cognome = "";
  //     this.personale.email = "";

  //   }
  // }

  async signupPersonale(signupFormPersonale: FormGroup): Promise<void> {
    if (!signupFormPersonale.valid) { 
      console.log(
        'Need to complete the form, current value: ', signupFormPersonale.value
      );
    } else {
      const email: string = signupFormPersonale.value.email;
      const password: string = signupFormPersonale.value.password;
      const nome: string = signupFormPersonale.value.nome;
      const cognome: string = signupFormPersonale.value.cognome;
      this.tipo = '2';

      console.log(this.nome);

      this.authService.signupUser(email, password, nome, cognome, this.tipo).then(
        () => {
          this.loading.dismiss().then(() => {

            this.cartService.addCart();

            this.router.navigateByUrl('amministratore/lista-personale');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertController.create({
              message: 'L\'email inserita è già utilizzata da un altro utente',
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingController.create();
      await this.loading.present();
    }
  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Attenzione!',
  //     subHeader: 'Personale non inserito.',
  //     message: 'Dei campi sono vuoti!\n Compilare tutti i campi per inserire il personale!',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

}
