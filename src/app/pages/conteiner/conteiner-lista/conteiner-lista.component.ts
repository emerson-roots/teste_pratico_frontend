import { ConteinerService } from './../../../services/conteiner.service';
import { ConteinerDTO } from './../../../dto/conteiner.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conteiner-lista',
  templateUrl: './conteiner-lista.component.html',
  styleUrls: ['./conteiner-lista.component.css']
})
export class ConteinerListaComponent implements OnInit {

  conteinerDTO!: ConteinerDTO[];

  constructor(private conteinerService: ConteinerService) { }

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
          console.log("Ocorreu um erro ao listar conteiners. Erro: " + error);
        });
  }

}
