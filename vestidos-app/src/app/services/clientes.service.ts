import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaClientes } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient) { }

  clienteEliminado = new EventEmitter<boolean>();


  getClientes() {
    return this.http.get<RespuestaClientes>(`${URL}/clientes`);
  }

  getFullClientes() {
    return this.http.get<RespuestaClientes>(`${URL}/clientes//fullClientes`);
  }

  creaCliente( cliente) {
    return new Promise( resolve => {

        this.http.post(`${URL}/clientes/create`, cliente)
          .subscribe( resp => {
            console.log(resp);
            resolve(true);
          })
    });
  }

  getCliente( id: number) {
    return this.http.get<RespuestaClientes>(`${URL}/clientes/${id}`);
  }

  borrarCliente(idBorrar: string) {
    return new Promise( resolve => {
      this.http.get<RespuestaClientes>(`${URL}/clientes/delete/${idBorrar}`)
        .subscribe( resp => {
          console.log(resp);
          resolve(true);
        })
  });
    
  }
}
