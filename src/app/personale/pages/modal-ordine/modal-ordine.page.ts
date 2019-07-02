import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-ordine',
  templateUrl: './modal-ordine.page.html',
  styleUrls: ['./modal-ordine.page.scss'],
})
export class ModalOrdinePage implements OnInit {

  id: any;

  constructor(private navParams: NavParams,) { }

  ngOnInit() {

    this.id = this.navParams.get('custom_id');
    this.getProdotto();
  }

}
