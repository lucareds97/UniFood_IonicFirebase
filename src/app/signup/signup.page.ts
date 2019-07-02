import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/service_cliente/cart.service';
import { UtenteService } from '../services/service_amministratore/utente.service';
import { Utente } from '../interfaces/utente';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  
  public signupForm: FormGroup;
  public loading: any;

  tipo: string;
  nome: string;
  cognome: string;

  idCliente: string;

  utente: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private userService: UtenteService,
  ) {
    this.signupForm = this.formBuilder.group({
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

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      const nome: string = signupForm.value.nome;
      const cognome: string = signupForm.value.cognome;
      this.tipo = '1';

      this.authService.signupUser(email, password, nome, cognome, this.tipo).then(() => {

          this.loading.dismiss().then(() => {

            this.authService.loginUser(email,password).then(() =>
            this.cartService.addCart()
              );
              this.router.navigateByUrl('/cliente/visualizza-prodotti');

          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: 'L\'email inserita è già utilizzata da un altro utente',
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  ngOnInit() {}

}