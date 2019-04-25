import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaPagos } from '../interfaces/interfaces';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient) { }


  getPagosPorCliente( idCliente) {
    return this.http.get<RespuestaPagos>(`${URL}/pagos/getpagos/${idCliente}`);
  }
}
