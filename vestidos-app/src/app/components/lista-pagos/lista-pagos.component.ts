import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PagosFormularioComponent } from '../pagos-formulario/pagos-formulario.component';
import { Pago } from 'src/app/interfaces/interfaces';
import { PagosService } from '../../services/pagos.service';

@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.scss'],
})
export class ListaPagosComponent implements OnInit {

  @Input() clienteId;
  @Input() pagos: Pago[] = [];

  sumaPagos: number = 0 ;
  faltante: number;
  totalPagar: number = 0;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  

  constructor(private modalCtrl: ModalController,
              private pagosService: PagosService) { }

  ngOnInit() {

    this.calcularFaltante();
    
    this.pagosService.nuevoPago
      .subscribe( pago => {
        this.sumaPagos = 0;
        this.pagos.push(pago);
        this.calcularFaltante();
      })
    //console.log(this.pagos[this.pagos.length -1].total);
  }


  calcularFaltante() {
    console.log('Pagos', this.pagos);
    
    if (this.pagos.length == 0) {
        this.totalPagar = null;
    } else {
      this.totalPagar = this.pagos[this.pagos.length -1].total || 0;
    }

    for (const pago of this.pagos) {
      this.sumaPagos = this.sumaPagos + pago.monto;
    }
    this.faltante = this.totalPagar - this.sumaPagos;

    console.log(this.pagos.length);
  }



  async pagosFormulario( idCliente, totalPagar, faltante ) {
    const modal = await this.modalCtrl.create({
      component: PagosFormularioComponent,
      componentProps: {
        idCliente,
        totalPagar,
        faltante
      }
    });
    modal.present();
  }

}
