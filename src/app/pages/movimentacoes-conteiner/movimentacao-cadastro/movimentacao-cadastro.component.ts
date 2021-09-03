import { DatePipe, formatDate } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovimentacaoConteinerDTO } from 'src/app/dto/movimentacao-conteiner.dto';
import { ConteinerService } from 'src/app/services/conteiner.service';
import { MovimentacaoConteinerService } from 'src/app/services/movimentacao-conteiner.service';
import { ConteinerDTO } from 'src/app/dto/conteiner.dto';
import { Subscription } from 'rxjs';
import * as moment from 'moment';


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

  // preEdit() {
  //   //captura id na URL conforme parametro especificado na rota
  //   const movimentacaoEdit = this.actRoute.snapshot.data['movimentacaoResolverDTO'];
  //   console.log(movimentacaoEdit)

  //   //verifica se contém um usuario valido
  //   if (movimentacaoEdit) {

  //     this.movimentacaoDTO = movimentacaoEdit;
  //     console.log("movimentacaoEdit")
  //     console.log(movimentacaoEdit)
  //     console.log("this.movimentacaoDTO")
  //     console.log(this.movimentacaoDTO)


  //     //carrega dados no form para edição
  //     this.updateForm(this.movimentacaoDTO);


  //   }
  // }




  preEdit() {

    let qtdparamsRecebidos = this.actRoute.snapshot.paramMap.getAll('id').length;

    //somente carrega dados no forma para editar
    //se nao vier parametros ID
    if (qtdparamsRecebidos != 0) {
      /**
       * https://www.youtube.com/watch?v=AEUSrpsAPtw
       * trecho implementado com base no video Loiane Groner
       */
      this.inscricao = this.actRoute.data.subscribe(
        (movimentacao) => {


          // o atributo "cargoResolver" esta ligado diretamente com o
          // parametro setado no "app-routing.module.ts"
          this.movimentacaoDTO = movimentacao.resolverMovimentacao;
          this.updateForm(this.movimentacaoDTO)
        }, error => {
          alert("Ocorreu um erro ao pré carregar os dados para edição de Movimentacao.");
        });
    }
  }

  /** carrega dados no formulario para edicao */
  updateForm(movimentacaoDTO: MovimentacaoConteinerDTO) {


    console.log(movimentacaoDTO.dataHoraInicio)
    console.log(movimentacaoDTO.dataHoraFim)

    let formatDateToInput: string = "yyyy-MM-DDTHH:mm";
    // movimentacaoDTO.dataHoraInicio = moment(movimentacaoDTO.dataHoraInicio).format(formatDateToInput);
    // movimentacaoDTO.dataHoraFim = moment(movimentacaoDTO.dataHoraFim).format(formatDateToInput);


    this.formGroup.patchValue({
      id: movimentacaoDTO.id,
      tipoMovimentacao: movimentacaoDTO.tipoMovimentacao,
      dataHoraInicio: movimentacaoDTO.dataHoraInicio,
      dataHoraFim: movimentacaoDTO.dataHoraFim,
      conteiner: movimentacaoDTO.conteiner

    });
  }


  // salvar serve para POST e para PUT
  salvar() {
    console.log(this.formGroup.value)



    if (!this.formGroup.invalid) {
      let movimentacaoDTO: MovimentacaoConteinerDTO = this.formGroup.value;
      console.log(movimentacaoDTO.dataHoraInicio)

      movimentacaoDTO.dataHoraInicio = moment(movimentacaoDTO.dataHoraInicio).format('DD/MM/yyyy HH:mm');
      movimentacaoDTO.dataHoraFim = moment(movimentacaoDTO.dataHoraFim).format('DD/MM/yyyy HH:mm');
      console.log(movimentacaoDTO.dataHoraInicio)

      this.movimentacaoService.save(movimentacaoDTO)
        .subscribe(response => {

          if (movimentacaoDTO.id == null) {

            alert(`Movimentacão de Conteiner ${JSON.stringify(movimentacaoDTO.tipoMovimentacao)} cadastrado com sucesso!`);
          } else {
            alert(`Movimentacão de ${JSON.stringify(movimentacaoDTO.tipoMovimentacao)} alterado com sucesso!`);
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
