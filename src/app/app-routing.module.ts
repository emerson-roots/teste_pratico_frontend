import { ConteinerResolverGuard } from './resolver-guard/conteiner-resolver';
import { MovimentacaoListaComponent } from './pages/movimentacoes-conteiner/movimentacao-lista/movimentacao-lista.component';
import { MovimentacaoCadastroComponent } from './pages/movimentacoes-conteiner/movimentacao-cadastro/movimentacao-cadastro.component';
import { ConteinerListaComponent } from './pages/conteiner/conteiner-lista/conteiner-lista.component';
import { ConteinerCadastroComponent } from './pages/conteiner/conteiner-cadastro/conteiner-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConteinerCadastroComponent },
  { path: 'conteiner/listar', component: ConteinerListaComponent },
  {
    path: 'conteiner/editar/:id', component: ConteinerCadastroComponent,
    resolve: {
      conteinerResolverDTO: ConteinerResolverGuard
    }
  },
  { path: 'movimentacao/cadastrar', component: MovimentacaoCadastroComponent },
  { path: 'movimentacao/listar', component: MovimentacaoListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
