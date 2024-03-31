import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaPesquisaComponent } from './pessoa/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa/pessoa-cadastro/pessoa-cadastro.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([ 
    { path: '', redirectTo: 'pessoa-pesquisa', pathMatch: 'full' },
     {path: 'pessoa-pesquisa', component: PessoaPesquisaComponent},
     {path: 'pessoa', component: PessoaCadastroComponent},
     {path: 'pessoa/:id', component: PessoaCadastroComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
