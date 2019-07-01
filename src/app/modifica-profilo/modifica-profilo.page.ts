import { Component, OnInit } from '@angular/core';
import { Utente } from '../interfaces/utente';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteService } from '../services/service_amministratore/utente.service';
import { AuthService } from '../services/user/auth.service';
import { Location } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modifica-profilo',
  templateUrl: './modifica-profilo.page.html',
  styleUrls: ['./modifica-profilo.page.scss'],
})
export class ModificaProfiloPage implements OnInit {
  [x: string]: any;


  utente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: '',
  };

  id: any;

  constructor(private activatedRoute: ActivatedRoute,  private router: Router, private authService: AuthService, private location: Location) {

   
   
   }
  public resetPasswordForm: FormGroup;


  
  ngOnInit() {
    
    this.authService.getUserData();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProfilo();
  }

  getProfilo(){
    this.utente = this.authService.utente;
    console.log(this.utente);
  }

    
  modificaProfilo(){
    this.id = this.authService.getUserId();
    console.log(this.id);
    this.authService.updateProfile(this.utente, this.id).then(() =>{
      this.authService.changeEmail(this.utente.email);
    });
    this.location.back();
    
  }

  

 
}
