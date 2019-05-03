import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaCita, Cita } from '../interfaces/interfaces';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  nuevaCita = new EventEmitter<Cita>();


  constructor(private http: HttpClient) { }

  crearCita( cita, idCliente) {
    return new Promise( resolve => {

      this.http.post(`${URL}/citas/create/${idCliente}`, cita)
        .subscribe( resp => {
          if (resp['ok'] == true) {
            resolve(true);
             this.nuevaCita.emit(resp['newCita']);
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

  getCitasPorCliente( idCliente) {
    return this.http.get<RespuestaCita>(`${URL}/citas/getcitas/${idCliente}`);
  }

  getTodasLasCitas() {
    return this.http.get<RespuestaCita>(`${URL}/citas`);
  }
}
