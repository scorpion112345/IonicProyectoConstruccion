import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaVestidos } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class VestidosService {

   nuevoVestido = new EventEmitter<boolean>();
  constructor( private http: HttpClient ) { }

  vestidoEliminado = new EventEmitter<boolean>();

  getVestidos() {
    return this.http.get<RespuestaVestidos>(`${URL}/vestidos`);
  }

  creaVestido( vestido, idCliente ) {
    return new Promise( resolve => {

        this.http.post(`${URL}/vestidos/create/${idCliente}`, vestido)
          .subscribe( resp => {
            console.log(resp);
            this.nuevoVestido.emit(true);
            resolve(true);
          })
    });
  }

  getVestido( id: number) {
    return this.http.get<RespuestaVestidos>(`${URL}/vestidos/${id}`);
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

  actualizaVestido(vestido, idVestido) {
    return new Promise( resolve => {

      this.http.post(`${URL}/vestidos/update/${idVestido}`, vestido)
        .subscribe( resp => {
          console.log(resp);
          this.nuevoVestido.emit(true);
          resolve(true);
        })
  });
  }
}
