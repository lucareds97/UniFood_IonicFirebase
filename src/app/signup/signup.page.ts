import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
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
      ],
      cognome: [
        '',
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

      console.log(this.nome);

      this.authService.signupUser(email, password, nome, cognome, this.tipo).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('/login');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
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