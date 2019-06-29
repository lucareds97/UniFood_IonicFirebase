import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { AlertController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.page.html',
  styleUrls: ['./modal-cliente.page.scss'],
})
export class ModalPage implements OnInit {

  cliente: Utente = {
    nome: '',
    cognome: '',
    email: '',
    tipo: ''
  };

  id: any;

  constructor(private authService: AuthService, private router: Router, private utenteService: UtenteService,  public alertController: AlertController, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.id = this.navParams.get('custom_id');
    this.getCliente();
  }

  closeModal(){
    this.modalController.dismiss();
  }


  getCliente(){
    this.utenteService.getUserCollection(this.id).subscribe(res =>{
      this.cliente = res;
      console.log(res);
    });
  }
}
