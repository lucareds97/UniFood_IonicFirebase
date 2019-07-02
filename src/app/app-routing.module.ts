import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';
import { CanActivate } from '@angular/router/src/utils/preactivation';


const routes: Routes = [

  {
    path: '',
    loadChildren: './login/login.module#LoginPageModule',
  },

  {
    path: 'login', loadChildren: './login/login.module#LoginPageModule',
  },

  {
    path: '',
    loadChildren: './personale/tabs_personale/tabs_personale.module#TabsPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '2'}
  },

  {
    path: 'lista-prodotti',
    loadChildren: './personale/lista-prodotti/lista-prodotti.module#ListaProdottiPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '2'}
  },
  {
    path: 'modifica-prodotto',
    loadChildren: './personale/modifica-prodotto/modifica-prodotto.module#ModificaProdottoPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '2'}
  },

  {
    path: 'visualizza-prodotto',
    loadChildren: './personale/visualizza-prodotto/visualizza-prodotto.module#VisualizzaProdottoPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '2'}
  },

  {
    path: 'modal',
    loadChildren: './personale/pages/modal/modal.module#ModalPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '2'}
  },

  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupPageModule',
  },

  {
    path: '',
    loadChildren: './cliente/tabs_cliente/tabs_cliente.module#TabsPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '1'}
  },


  {
    path: 'visualizza-prodotti',
    loadChildren: './cliente/visualizza-prodotti/visualizza-prodotti.module#VisualizzaProdottiPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '1'}
  },

  {
    path: 'carrello',
    loadChildren: './cliente/carrello/carrello.module#CarrelloPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '1'}
  },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },

  {
    path: '',
    loadChildren: './amministratore/tabs_amministratore/tabs_amministratore.module#TabsPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '3'}
  },

  {
    path: 'lista-personale',
    loadChildren: './amministratore/lista-personale/lista-personale.module#ListaPersonalePageModule',
    canActivate: [AuthGuard],
    data: {tipo: '3'}
  },

  // {
  //   path: 'modalPersonale',
  //   loadChildren: './amministratore/pages/modal/modal-personale.module#ModalPersonalePageModule',
  //   canActivate: [AuthGuard],
  //   data: {tipo: '3'}
  // },

  {
    path: 'lista-clienti',
    loadChildren: './amministratore/lista-clienti/lista-clienti.module#ListaClientiPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '3'}
  },
  
  {
    path: 'modalOrdine',
    loadChildren: './personale/pages/modal-ordine/modal-ordine.module#ModalOrdinePageModule',
    canActivate: [AuthGuard],
    data: {tipo: '2'}
  },

  
  // { path: 'modal-tipo', 
  // loadChildren: '.personale/pages/modal-tipo/modal-tipo.module#ModalTipoPageModule',
  
   
//},
  //{ path: 'pages', loadChildren: './pages/pages.module#PagesPageModule' },



  {
    path: 'modalCliente',
    loadChildren: './amministratore/pages/modal-cliente/modal-cliente.module#ModalClientePageModule',
    canActivate: [AuthGuard],
    data: {tipo: '3'}
  },

  { 
    path: 'eh-volevi', 
    loadChildren: './eh-volevi/eh-volevi.module#EhVoleviPageModule',
    canActivate: [AuthGuard],
    data: {tipo: '3' && '2' && '1'}
  },

  { path: 'modifica-profilo', 
    loadChildren: './modifica-profilo/modifica-profilo.module#ModificaProfiloPageModule',
    // canActivate: [AuthGuard]
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
