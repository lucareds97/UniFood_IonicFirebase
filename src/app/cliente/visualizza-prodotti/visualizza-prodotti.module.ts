import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisualizzaProdottiPage } from './visualizza-prodotti.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizzaProdottiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisualizzaProdottiPage]
})
export class VisualizzaProdottiPageModule {}
