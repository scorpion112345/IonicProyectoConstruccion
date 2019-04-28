import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient) { }

  crearCita( cita, idCliente) {
    return new Promise( resolve => {

      this.http.post(`${URL}/citas/create/${idCliente}`, cita)
        .subscribe( resp => {
          if (resp['ok'] == true) {
            resolve(true);
          } else {
            resolve(false);
          }
          console.log(resp);
        })
  });
  }

  crearNotificacion( data) {
    return new Promise( resolve => {

      this.http.post(`${URL}/citas/prueba`, data)
        .subscribe( resp => {
          if (resp['ok'] == true) {
            resolve(true);
          } else {
            resolve(false);
          }
          console.log(resp);
        })
  });
  }
}
