import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MOVIMENTACAO_CONTEINER_API } from 'src/app/config/api.config';
import { MovimentacaoConteinerDTO } from 'src/app/dto/movimentacao-conteiner.dto';
import { MovimentacaoConteinerService } from 'src/app/services/movimentacao-conteiner.service';

@Component({
  selector: 'app-movimentacao-lista',
  templateUrl: './movimentacao-lista.component.html',
  styleUrls: ['./movimentacao-lista.component.css']
})
export class MovimentacaoListaComponent implements OnInit {

  movimentacaoConteinerDTO!: MovimentacaoConteinerDTO[];

  constructor(private movimentacaoConteinerService: MovimentacaoConteinerService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {

    this.movimentacaoConteinerService.findAll()
      .subscribe(response => {
        this.movimentacaoConteinerDTO = response;
        console.log(this.movimentacaoConteinerDTO)
      },
        error => {
          console.log("Ocorreu um erro ao listar movimentações de conteiners. Erro: " + JSON.stringify(error));
        });
  }

  delete(id: any) {
    this.movimentacaoConteinerService.delete(id)
      .subscribe(() => {
        this.findAll();
        alert("Movimentacao de conteiner excluído com sucesso!");
      }, error => {
        alert("Ocorreu um erro ao excluir a movimentação de conteiner. Erro: " + JSON.stringify(error.error))
      });
  }

  edit(id: number) {
    this.router.navigate(["movimentacao/editar", id])
  }
}
