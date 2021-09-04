import { MovimentacaoConteinerDTO } from './../../../dto/movimentacao-conteiner.dto';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConteinerService } from 'src/app/services/conteiner.service';
import { MovimentacaoConteinerService } from 'src/app/services/movimentacao-conteiner.service';
import { ConteinerDTO } from 'src/app/dto/conteiner.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movimentacao-cadastro',
  templateUrl: './movimentacao-cadastro.component.html',
  styleUrls: ['./movimentacao-cadastro.component.css']
})
export class MovimentacaoCadastroComponent implements OnInit {

  formGroup: FormGroup;
  tipoMovimentacoes!: string[];
  conteinerDTO!: ConteinerDTO[];

  // usado no pre edit para update
  movimentacaoDTO!: MovimentacaoConteinerDTO;
  inscricao!: Subscription


  constructor(
    private formBuilder: FormBuilder,
    private movimentacaoService: MovimentacaoConteinerService,
    private conteinerService: ConteinerService,
    private actRoute: ActivatedRoute,
    private datePipe: DatePipe) {

    const nonWhiteSpaceRegExp: RegExp = new RegExp("\\S");

    this.formGroup = this.formBuilder.group({
      id: [null],
      tipoMovimentacao: ['', [Validators.required]],
      dataHoraInicio: [null, [Validators.required]],
      dataHoraFim: [null],
      conteiner: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {
    this.getConteiners();
    this.getTipoMovimentacoes();
    this.preEdit();

  }

  preEdit() {
    //captura id na URL conforme parametro especificado na rota
    const movimentacaoEdit = this.actRoute.snapshot.data['resolverMovimentacao'];

    //verifica se contém um usuario valido
    if (movimentacaoEdit) {

      this.movimentacaoDTO = movimentacaoEdit;

      // carrega os dados no form
      this.formGroup.patchValue(this.movimentacaoDTO);
    }
  }

  // salvar serve para POST e para PUT
  salvar() {

    if (!this.formGroup.invalid) {
      this.movimentacaoDTO = this.formGroup.value;

      this.movimentacaoService.save(this.movimentacaoDTO)
        .subscribe(response => {

          if (this.movimentacaoDTO.id == null) {

            alert(`Movimentacão de Conteiner tipo ${JSON.stringify(this.movimentacaoDTO.tipoMovimentacao)} cadastrado com sucesso!`);
          } else {
            alert(`Movimentacão de Conteiner tipo ${JSON.stringify(this.movimentacaoDTO.tipoMovimentacao)} alterado com sucesso!`);
          }

          this.formGroup.reset()

        }, error => {
          alert("Ocorreu um erro ao tentar inserir Movimentacão de Conteiner. Erro: " + JSON.stringify(error));
        });
    } else {
      this.marcaCampoComoModificado(this.formGroup);
    }

  }


  marcaCampoComoModificado(form: FormGroup) {

    Object.keys(form.controls)
      .forEach(campoIterado => {

        const controle = form.get(campoIterado);

        controle?.markAsDirty();
        controle?.markAsTouched();

      });
  }


  getTipoMovimentacoes() {
    return this.movimentacaoService.getTipoMovimentacoes()
      .subscribe((res: any) => {
        this.tipoMovimentacoes = res;
      },
        error => {
          alert("Ocorreu um erro ao tentar recuperar os tipos de Movimentações. Erro: " + JSON.stringify(error));
        })
  }

  getConteiners() {
    return this.conteinerService.findAll().subscribe(res => {
      this.conteinerDTO = res;
    },
      error => {
        alert("Ocorreu um erro ao carregar os Conteiners para cadastrar uma movimentação.");
      })
  }

  compararConteiners(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }


}
