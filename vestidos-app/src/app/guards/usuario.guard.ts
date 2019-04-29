import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanLoad {

  constructor( private usuarioService: UsuariosService) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.usuarioService.validaToken();
  }

/*   canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
    return false;
  } */
}
