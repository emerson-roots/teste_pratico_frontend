import { ConteinerService } from './../../../services/conteiner.service';
import { ConteinerDTO } from './../../../dto/conteiner.dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conteiner-lista',
  templateUrl: './conteiner-lista.component.html',
  styleUrls: ['./conteiner-lista.component.css']
})
export class ConteinerListaComponent implements OnInit {

  conteinerDTO!: ConteinerDTO[];

  constructor(private conteinerService: ConteinerService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {

    this.conteinerService.findAll()
      .subscribe(response => {
        this.conteinerDTO = response;
        console.log(this.conteinerDTO)
      },
        error => {
          console.log("Ocorreu um erro ao listar conteiners. Erro: " + JSON.stringify(error));
        });
  }

  delete(id: any) {
    this.conteinerService.delete(id)
      .subscribe(() => {
        this.findAll();
        alert("Conteiner excluído com sucesso!");
      }, error => {
        alert("Ocorreu um erro ao excluir o Conteiner. Erro: " + JSON.stringify(error.error))
      });
  }

  edit(id: number) {
    this.router.navigate(['conteiner/editar', id])
  }

}
