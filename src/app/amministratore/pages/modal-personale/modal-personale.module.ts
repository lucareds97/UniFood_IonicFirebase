import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ModalPersonalePage } from './modal-personale.page';


const routes: Routes = [
  {
    path: '',
    component: ModalPersonalePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalPersonalePage]
})
export class ModalPersonalePageModule {}
