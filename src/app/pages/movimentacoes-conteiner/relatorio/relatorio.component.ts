import { MovimentacaoConteinerService } from './../../../services/movimentacao-conteiner.service';
import { MovimentacaoConteinerDTO } from 'src/app/dto/movimentacao-conteiner.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  movimentacoesDTO!: MovimentacaoConteinerDTO[];

  totalMovimentacoes: number = 0;
  totalImportacoes: number = 0;
  totalExportacoes: number = 0;

  constructor(
    private movimentacoesService: MovimentacaoConteinerService
  ) { }

  ngOnInit(): void {
    this.getRelatorio();
  }

  getRelatorio() {

    this.movimentacoesService.getRelatorio()
      .subscribe(response => {

        this.movimentacoesDTO = response;

        // gera totais
        this.totalMovimentacoes = this.movimentacoesDTO.length;
        this.totalExportacoes = this.movimentacoesDTO.filter((obj) => obj.conteiner.categoria === 'Exportação').length;
        this.totalImportacoes = this.movimentacoesDTO.filter((obj) => obj.conteiner.categoria === 'Importacão').length;
      },
        error => {
          console.log("Ocorreu um erro recuperar relatório de movimentações. Erro: " + JSON.stringify(error));
        });
  }

  print() {
    window.print();
  }

}
