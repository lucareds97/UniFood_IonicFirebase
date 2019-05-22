import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ordini',
        children: [
          {
            path: '',
            loadChildren: '../ordini/ordini.module#OrdiniPageModule'
          }
        ]
      },
      {
        path: 'lista-prodotti',
        children: [
          {
            path: '',
            loadChildren: '../lista-prodotti/lista-prodotti.module#ListaProdottiPageModule'
          },
          {
            path: 'nuovo-prodotto',
            loadChildren: '../nuovo-prodotto/nuovo-prodotto.module#NuovoProdottoPageModule'
          }
        ]
      },
      {
        path: 'profilo',
        children: [
          {
            path: '',
            loadChildren: '../profilo/profilo.module#ProfiloPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/lista-prodotti',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/lista-prodotti',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
