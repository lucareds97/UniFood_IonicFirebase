import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModificaProdottoPage } from './modifica-prodotto.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaProdottoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModificaProdottoPage]
})
export class ModificaProdottoPageModule {}
