import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalProdottoClientePage } from './modal-prodotto-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProdottoClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalProdottoClientePage]
})
export class ModalProdottoClientePageModule {}
