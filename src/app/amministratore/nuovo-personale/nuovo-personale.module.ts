import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NuovoPersonalePage } from './nuovo-personale.page';

const routes: Routes = [
  {
    path: '',
    component: NuovoPersonalePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NuovoPersonalePage]
})
export class NuovoPersonalePageModule {}
