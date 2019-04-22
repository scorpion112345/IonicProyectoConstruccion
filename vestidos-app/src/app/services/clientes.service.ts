import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaClientes } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient) { }

  getClientes() {
    return this.http.get<RespuestaClientes>(`${URL}/clientes`);
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

  borrarCliente() {
    console.log("Cliente borrado");
    
  }
}
