import {  CONTEINER_API } from '../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConteinerDTO } from '../dto/conteiner.dto';


@Injectable()
export class ConteinerService {

  constructor(public http: HttpClient) {
  }

  // POST or PUT object
  save(obj: ConteinerDTO) {

    // se for nulo faz um POST, se não faz PUT
    if (obj.id == null) {
      return this.http.post(
        `${CONTEINER_API.baseUrl}`,
        obj,
        {
          observe: 'response',
          responseType: 'text'
        }
      );
    } else {
      return this.http.put(`${CONTEINER_API.baseUrl}/${obj.id}`, obj)
    }
  }

  findAll(): Observable<ConteinerDTO[]> {
    return this.http.get<ConteinerDTO[]>(`${CONTEINER_API.baseUrl}`);
  }

  delete(id: any) {
    return this.http.delete(`${CONTEINER_API.baseUrl}/${id}`);
  }

  loadById(id: any){
    return this.http.get(`${CONTEINER_API.baseUrl}/${id}`).pipe(take(1))
  }
}
