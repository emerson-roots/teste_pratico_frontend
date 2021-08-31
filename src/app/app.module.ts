import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConteinerCadastroComponent } from './pages/conteiner/conteiner-cadastro/conteiner-cadastro.component';
import { ConteinerListaComponent } from './pages/conteiner/conteiner-lista/conteiner-lista.component';
import { MovimentacaoCadastroComponent } from './pages/movimentacoes-conteiner/movimentacao-cadastro/movimentacao-cadastro.component';
import { MovimentacaoListaComponent } from './pages/movimentacoes-conteiner/movimentacao-lista/movimentacao-lista.component';
import { SidebarComponent } from './page-fragments/sidebar/sidebar.component';
import { NavbarComponent } from './page-fragments/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConteinerCadastroComponent,
    ConteinerListaComponent,
    MovimentacaoCadastroComponent,
    MovimentacaoListaComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
