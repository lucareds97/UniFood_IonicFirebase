import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPageAmministratore } from './tabs_amministratore.page';

const routes: Routes = [


  {
    path: 'amministratore',
    component: TabsPageAmministratore,
    children: [
      {
        path: 'niente',
        children: [
          {
            path: '',
            loadChildren: ''
          }
        ]
      },

      {
        path: 'lista-personale',
        children: [
          {
            path: '',
            loadChildren: '../lista-personale/lista-personale.module#ListaPersonalePageModule'
          }
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
