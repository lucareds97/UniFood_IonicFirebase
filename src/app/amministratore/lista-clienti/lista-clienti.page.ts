import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { UtenteService } from 'src/app/services/service_amministratore/utente.service';
import { ClienteService } from 'src/app/services/service_amministratore/cliente.service';
import { ModalPage } from 'src/app/amministratore/pages/modal-cliente/modal-cliente.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-clienti',
  templateUrl: './lista-clienti.page.html',
  styleUrls: ['./lista-clienti.page.scss'],
})
export class ListaClientiPage implements OnInit {

  listaClienti: any[] = [];

  // cliente: Utente = {
  //   nome: '',
  //   cognome: '',
  //   email: '',
  //   tipo: '',
  // };

  constructor(private modalController: ModalController, private clienteService: ClienteService, private utenteService: UtenteService, private authService: AuthService) { }

  ngOnInit() {

    this.getDatiUtente();

    this.utenteService.getListaUtente().subscribe((res) => {
      this.listaClienti = this.clienteService.getCliente(res);
      return this.listaClienti;
    });

  }

  getDatiUtente(){
    this.authService.userDataPromise();
  }


  async openModalCliente(id) {
    console.log(id);

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        custom_id: id
      }
    });

    await modal.present();
  }

}
