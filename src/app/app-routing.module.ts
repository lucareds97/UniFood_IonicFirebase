import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'lista-prodotti', loadChildren: './lista-prodotti/lista-prodotti.module#ListaProdottiPageModule' },
  { path: 'modifica-prodotto', loadChildren: './modifica-prodotto/modifica-prodotto.module#ModificaProdottoPageModule' },
  { path: 'visualizza-prodotto', loadChildren: './visualizza-prodotto/visualizza-prodotto.module#VisualizzaProdottoPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
