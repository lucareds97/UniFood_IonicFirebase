import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { AuthService } from '../services/user/auth.service';
import { Utente } from '../interfaces/utente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eh-volevi',
  templateUrl: './eh-volevi.page.html',
  styleUrls: ['./eh-volevi.page.scss'],
})
export class EhVoleviPage implements OnInit {

  utente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
  };

  constructor(private location: Location, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  back(){


    this.authService.userDataPromise().then((utente) => {

      this.utente = utente;
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
          
          break;
      }
      this.router.navigateByUrl(`/${categoria}`);
      

  })

}
}
