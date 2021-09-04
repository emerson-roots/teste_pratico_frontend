import { MovimentacaoConteinerDTO } from './../dto/movimentacao-conteiner.dto';
import { MOVIMENTACAO_CONTEINER_API } from './../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable()
export class MovimentacaoConteinerService {

  constructor(public http: HttpClient) {
  }

  // POST or PUT object
  save(obj: MovimentacaoConteinerDTO) {

    // se for nulo faz um POST, se não faz PUT
    if (obj.id == null) {
      return this.http.post(
        `${MOVIMENTACAO_CONTEINER_API.baseUrl}`,
        obj,
        {
          observe: 'response',
          responseType: 'text'
        }
      );
    } else {
      return this.http.put(`${MOVIMENTACAO_CONTEINER_API.baseUrl}/${obj.id}`, obj)
    }
  }

  findAll(): Observable<MovimentacaoConteinerDTO[]> {
    return this.http.get<MovimentacaoConteinerDTO[]>(`${MOVIMENTACAO_CONTEINER_API.baseUrl}`);
  }

  delete(id: any) {
    return this.http.delete(`${MOVIMENTACAO_CONTEINER_API.baseUrl}/${id}`);
  }

  loadById(id: any){
    return this.http.get(`${MOVIMENTACAO_CONTEINER_API.baseUrl}/${id}`).pipe(take(1))
  }

  getTipoMovimentacoes(){
    return this.http.get(`${MOVIMENTACAO_CONTEINER_API.baseUrl}/tipo_movimentacoes`).pipe(take(1))
  }

  getRelatorio(): Observable<MovimentacaoConteinerDTO[]> {
    return this.http.get<MovimentacaoConteinerDTO[]>(`${MOVIMENTACAO_CONTEINER_API.baseUrl}/relatorio`);
  }


}
