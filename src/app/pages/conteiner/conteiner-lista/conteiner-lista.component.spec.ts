import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteinerListaComponent } from './conteiner-lista.component';

describe('ConteinerListaComponent', () => {
  let component: ConteinerListaComponent;
  let fixture: ComponentFixture<ConteinerListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteinerListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteinerListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
