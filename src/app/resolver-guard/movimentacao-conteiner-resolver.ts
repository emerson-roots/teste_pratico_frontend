import { MovimentacaoConteinerDTO } from './../dto/movimentacao-conteiner.dto';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MovimentacaoConteinerService } from '../services/movimentacao-conteiner.service';


/**
 *
 * requer declaração no providers
 *
 */
@Injectable()
export class MovimentacaoConteinerResolverGuard implements Resolve<MovimentacaoConteinerDTO> {

  constructor(
    private movimentacaoConteinerService: MovimentacaoConteinerService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id: number = route.params['id']
    return this.movimentacaoConteinerService.loadById(id);
  }
}
