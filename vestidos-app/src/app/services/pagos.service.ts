import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaPagos, Pago } from '../interfaces/interfaces';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class PagosService {

  
  nuevoPago = new EventEmitter<Pago>();

  constructor(private http: HttpClient) { }


  getPagosPorCliente( idCliente) {
    return this.http.get<RespuestaPagos>(`${URL}/pagos/getpagos/${idCliente}`);
  }

  crearPago( pago, idCliente) {
    return new Promise( resolve => {

      this.http.post(`${URL}/pagos/create/${idCliente}`, pago)
        .subscribe( resp => {
          console.log(resp);
          this.nuevoPago.emit(resp['newPago']);
          resolve(true);
        })
  });
  }
}
