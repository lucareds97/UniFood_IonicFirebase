import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  
  { 
    path: '', 
  loadChildren: './personale/tabs_personale/tabs_personale.module#TabsPageModule',
  canActivate: [AuthGuard], 
},

  { 
    path: 'lista-prodotti', 
  loadChildren: './personale/lista-prodotti/lista-prodotti.module#ListaProdottiPageModule',
  canActivate: [AuthGuard], 
},
  { 
    path: 'modifica-prodotto', 
    loadChildren: './personale/modifica-prodotto/modifica-prodotto.module#ModificaProdottoPageModule',
    canActivate: [AuthGuard],  
  },

  { 
    path: 'visualizza-prodotto', 
    loadChildren: './personale/visualizza-prodotto/visualizza-prodotto.module#VisualizzaProdottoPageModule',
    canActivate: [AuthGuard], 
  },

  { 
    path: 'modal', loadChildren: './personale/pages/modal/modal.module#ModalPageModule',
    canActivate: [AuthGuard],
  },

  { 
    path: 'login', loadChildren: './login/login.module#LoginPageModule',
  },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
