import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaVestidos } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class VestidosService {

  constructor( private http: HttpClient ) { }

  vestidoEliminado = new EventEmitter<boolean>();

  getVestidos() {
    return this.http.get<RespuestaVestidos>(`${URL}/vestidos`);
  }

  creaVestido( vestido ) {
    return new Promise( resolve => {

        this.http.post(`${URL}/vestidos/create`, vestido)
          .subscribe( resp => {
            console.log(resp);
            resolve(true);
          })
    });
  }

  getVestido( id: string) {
    return this.http.get<RespuestaVestidos>(`${URL}/Vestidos/${id}`);
  }

  borrarVestido(idBorrar: string) {
    return new Promise( resolve => {
      this.http.get<RespuestaVestidos>(`${URL}/Vestidos/delete/${idBorrar}`)
        .subscribe( resp => {
          console.log(resp);
          resolve(true);
        })
  });
    
  }
}
