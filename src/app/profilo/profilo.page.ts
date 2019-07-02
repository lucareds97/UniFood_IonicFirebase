import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { Utente } from 'src/app/interfaces/utente';
import { Router } from '@angular/router';

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
    idUtente: ''
  };
  
  constructor(private authService: AuthService, private router: Router){
    let categoria: string;

  }

  

  logout(){
    this.authService.logoutUser();
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {

    this.getDatiUtente();
  }

  getDatiUtente(){

    this.authService.userDataPromise().then((utente) => {
      this.utente = utente;

      switch (this.utente.tipo) {

        case '1':
            this.utente.tipo = 'Cliente:';
          break;
  
        case '2':
            this.utente.tipo = 'Personale:';
          break;
  
        case '3':
            this.utente.tipo = 'Amministratore:';
          break;
  
        
      }

    })

  }
}

