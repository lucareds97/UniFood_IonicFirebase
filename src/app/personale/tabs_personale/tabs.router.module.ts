import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPagePersonale } from './tabs_personale.page';

const routes: Routes = [


  {
    path: 'personale',
    component: TabsPagePersonale,
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
          },
          {
            path: 'modifica-prodotto/:id',
            loadChildren: '../modifica-prodotto/modifica-prodotto.module#ModificaProdottoPageModule'
          },
          {
            path: 'visualizza-prodotto/:id',
            loadChildren: '../visualizza-prodotto/visualizza-prodotto.module#VisualizzaProdottoPageModule'
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
        redirectTo: '/lista-prodotti',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '',
    redirectTo: '/personale/lista-prodotti',
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
