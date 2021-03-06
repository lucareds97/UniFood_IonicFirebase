import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPageAmministratore } from './tabs_amministratore.page';

const routes: Routes = [


  {
    path: 'amministratore',
    component: TabsPageAmministratore,
    children: [
      {
        path: 'lista-clienti',
        children: [
          {
            path: '',
            loadChildren: '../lista-clienti/lista-clienti.module#ListaClientiPageModule'
          }
        ]
      },

      {
        path: 'lista-personale',
        children: [
          {
            path: '',
            loadChildren: '../lista-personale/lista-personale.module#ListaPersonalePageModule'
          },
          {
            path: 'nuovo-personale',
            loadChildren: '../nuovo-personale/nuovo-personale.module#NuovoPersonalePageModule'
          },
        ]
      },
      
      {
        path: 'profilo',
        children: [
          {
            path: '',
            loadChildren: '../../profilo/profilo.module#ProfiloPageModule'
          }
        ]
      },
      
      {
        path: '',
        redirectTo: '/amministratore/lista-personale',
        pathMatch: 'full'
    
    }
    
    ]
  },

  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
