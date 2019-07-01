import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EhVoleviPage } from './eh-volevi.page';

const routes: Routes = [
  {
    path: '',
    component: EhVoleviPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EhVoleviPage]
})
export class EhVoleviPageModule {}
