import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteinerCadastroComponent } from './conteiner-cadastro.component';

describe('ConteinerCadastroComponent', () => {
  let component: ConteinerCadastroComponent;
  let fixture: ComponentFixture<ConteinerCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteinerCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteinerCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
