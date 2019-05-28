import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NuovoProdottoPage } from './nuovo-prodotto.page';
import { WheelSelector } from '@ionic-native/wheel-selector';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: NuovoProdottoPage }])
    ],
  declarations: [NuovoProdottoPage]
})
export class NuovoProdottoPageModule {}
