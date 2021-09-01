import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-conteiner-cadastro',
  templateUrl: './conteiner-cadastro.component.html',
  styleUrls: ['./conteiner-cadastro.component.css']
})
export class ConteinerCadastroComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {


    const nonWhiteSpaceRegExp: RegExp = new RegExp("\\S");
    const patternCodigoConteiner: RegExp = new RegExp("[A-Z]{4}[0-9]{7}");

    this.formGroup = this.formBuilder.group({
      id: [null],
      cliente: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern(nonWhiteSpaceRegExp)]],
      codigoConteiner: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(patternCodigoConteiner)]],
      tipoConteiner: ['', [Validators.required]],
      status: ['', [Validators.required]],
      categoria: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {
  }

  salvar() {
    console.log(this.formGroup.value)

  }

}
