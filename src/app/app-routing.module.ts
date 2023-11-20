import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'logar',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./view/pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./view/pages/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./view/pages/usuarios/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'logar',
    loadChildren: () => import('./view/pages/usuarios/logar/logar.module').then( m => m.LogarPageModule)
  },
];

@NgModule({
  imports: [
     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }