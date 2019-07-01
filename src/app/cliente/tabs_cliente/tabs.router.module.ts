import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPageCliente } from './tabs_cliente.page';

const routes: Routes = [

  {
    path: 'cliente',
    component: TabsPageCliente,
    children: [
      {
        path: 'carrello',
        children: [
          {
            path: '',
            loadChildren: '../carrello/carrello.module#CarrelloPageModule'
          }
        ]
      },

      {
      path: 'visualizza-prodotti',
      children: [
        {
          path: '',
          loadChildren: '../visualizza-prodotti/visualizza-prodotti.module#VisualizzaProdottiPageModule'
        },
    //     {
    //       path: 'visualizza-prodotto/:id',
    //       loadChildren: '../visualizza-prodotto/visualizza-prodotto.module#VisualizzaProdottoPageModule'
    //     }
      ]
     },

     {
        path: 'profilo',
        children: [
          {
            path: '',
            loadChildren: '../../profilo/profilo.module#ProfiloPageModule'
          },
          {
            path: 'modifica-profilo',
            loadChildren: '../../modifica-profilo/modifica-profilo.module#ModificaProfiloPageModule'
          },
        ]
      },

    

    {
      path: '',
      component: TabsPageCliente,
      redirectTo: '/cliente/visualizza-prodotti',
      pathMatch: 'full'
    }

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
