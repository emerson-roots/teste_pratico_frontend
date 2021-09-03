import { ConteinerService } from './../../../services/conteiner.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConteinerDTO } from 'src/app/dto/conteiner.dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-conteiner-cadastro',
  templateUrl: './conteiner-cadastro.component.html',
  styleUrls: ['./conteiner-cadastro.component.css']
})
export class ConteinerCadastroComponent implements OnInit {

  formGroup: FormGroup;
  tiposConteiner!: string[];
  status!: string[];
  categorias!: string[];

  // usado no pre edit para update
  conteinerDTO!: ConteinerDTO;


  constructor(
    private formBuilder: FormBuilder,
    private conteinerService: ConteinerService,
    private actRoute: ActivatedRoute) {

    const nonWhiteSpaceRegExp: RegExp = new RegExp("\\S");
    const patternCodigoConteiner: RegExp = new RegExp("[A-Z]{4}[0-9]{7}");

    this.formGroup = this.formBuilder.group({
      id: [null],
      cliente: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern(nonWhiteSpaceRegExp)]],
      codigoConteiner: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(patternCodigoConteiner), Validators.pattern(nonWhiteSpaceRegExp)]],
      tipoConteiner: ['', [Validators.required]],
      status: ['', [Validators.required]],
      categoria: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {
    this.getTiposConteiner();
    this.getStatusConteiner();
    this.getCategoriasConteiner();
    this.preEdit();

  }

  preEdit() {
    //captura id na URL conforme parametro especificado na rota
    const conteinerEdit = this.actRoute.snapshot.data['conteinerResolverDTO'];
    console.log(conteinerEdit);

    //verifica se contém um usuario valido
    if (conteinerEdit) {

      this.conteinerDTO = conteinerEdit;

      //carrega dados no form para edição
      this.formGroup.patchValue(this.conteinerDTO);
    }
  }


  // salvar serve para POST e para PUT
  salvar() {
    console.log(this.formGroup.value)

    if (!this.formGroup.invalid) {
      let conteinerDTO: ConteinerDTO = this.formGroup.value;

      this.conteinerService.save(conteinerDTO)
        .subscribe(response => {

          if (conteinerDTO.id == null) {

            alert(`Conteiner ${JSON.stringify(this.formGroup.controls.codigoConteiner.value)} cadastrado com sucesso!`);
          } else {
            alert(`Conteiner ${JSON.stringify(this.formGroup.controls.codigoConteiner.value)} alterado com sucesso!`);
          }

          this.formGroup.reset()

        }, error => {
          alert("Ocorreu um erro ao tentar inserir Conteiner. Erro: " + JSON.stringify(error));
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


  getTiposConteiner() {
    return this.conteinerService.getTiposConteiner()
      .subscribe((res: any) => {
        this.tiposConteiner = res;
      },
        error => {
          alert("Ocorreu um erro ao tentar recuperar os tipos de Conteiner. Erro: " + JSON.stringify(error));
        })
  }


  getStatusConteiner() {
    return this.conteinerService.getStatusConteiner()
      .subscribe((res: any) => {
        this.status = res;
      },
        error => {
          alert("Ocorreu um erro ao tentar recuperar os Status de Conteiner. Erro: " + JSON.stringify(error));
        })
  }


  getCategoriasConteiner() {
    return this.conteinerService.getCategoriasConteiner()
      .subscribe((res: any) => {
        this.categorias = res;
      },
        error => {
          alert("Ocorreu um erro ao tentar recuperar as Categorias de Conteiner. Erro: " + JSON.stringify(error));
        })
  }

}
