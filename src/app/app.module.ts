import { ConteinerService } from './services/conteiner.service';
import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConteinerCadastroComponent } from './pages/conteiner/conteiner-cadastro/conteiner-cadastro.component';
import { ConteinerListaComponent } from './pages/conteiner/conteiner-lista/conteiner-lista.component';
import { MovimentacaoCadastroComponent } from './pages/movimentacoes-conteiner/movimentacao-cadastro/movimentacao-cadastro.component';
import { MovimentacaoListaComponent } from './pages/movimentacoes-conteiner/movimentacao-lista/movimentacao-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConteinerResolverGuard } from './resolver-guard/conteiner-resolver';
import { NgxMaskModule } from 'ngx-mask';
import { MovimentacaoConteinerResolverGuard } from './resolver-guard/movimentacao-conteiner-resolver';
import { MovimentacaoConteinerService } from './services/movimentacao-conteiner.service';
import { RelatorioComponent } from './pages/movimentacoes-conteiner/relatorio/relatorio.component';
import { NavbarComponent } from './pages/page-fragments/navbar/navbar.component';
import { ShowValidationErrorsComponent } from './pages/page-fragments/show-validation-errors/show-validation-errors.component';
import { SidebarComponent } from './pages/page-fragments/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    ConteinerCadastroComponent,
    ConteinerListaComponent,
    MovimentacaoCadastroComponent,
    MovimentacaoListaComponent,
    SidebarComponent,
    NavbarComponent,
    ShowValidationErrorsComponent,
    RelatorioComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule, // necessario para form group/ form builder
    ReactiveFormsModule, // necessario para form group/ form builder
    NgxMaskModule.forRoot({
    })
  ],
  providers: [
    ConteinerService,
    MovimentacaoConteinerService,
    ConteinerResolverGuard,
    MovimentacaoConteinerResolverGuard

  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
