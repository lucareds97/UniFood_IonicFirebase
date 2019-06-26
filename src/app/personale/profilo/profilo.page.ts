import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { Utente } from 'src/app/interfaces/utente';

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
  
  constructor(private authService: AuthService){
  }

  logout(){
    this.authService.logoutUser();
  }

  getDatiProfilo(){
    this.utente = this.authService.utente;
    console.log(this.utente);
  }

  ngOnInit() {
    this.getDatiProfilo();
  }



}

