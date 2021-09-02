import { ConteinerDTO } from './../dto/conteiner.dto';
import { Injectable } from "@angular/core";
import { ConteinerService } from '../services/conteiner.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


/**
 *
 * requer declaração no providers
 *
 */
@Injectable()
export class ConteinerResolverGuard implements Resolve<ConteinerDTO> {

  constructor(private conteinerService: ConteinerService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id: number = route.params['id']
    return this.conteinerService.loadById(id);
  }
}
