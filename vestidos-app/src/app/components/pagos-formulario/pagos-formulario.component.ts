import { Component, OnInit, Input } from '@angular/core';
import { Pago } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-pagos-formulario',
  templateUrl: './pagos-formulario.component.html',
  styleUrls: ['./pagos-formulario.component.scss'],
})
export class PagosFormularioComponent implements OnInit {

  @Input() idCliente;
  @Input() totalPagar;
  @Input() faltante;
  @Input() sumaPagos;

  invalido = false;


  nuevoPago: Pago = {
    monto: null,
    fecha: '',
    total: null,
    estado:''
  };

  creando: boolean = false;
  fecha: Date = new Date();
 


  constructor( private pagosService: PagosService,
                private modalCtrl: ModalController,
                private uiService: UiServiceService) { }

  ngOnInit() {
    this.nuevoPago.total = this.totalPagar;
    console.log(this.faltante);
    
  }

  async registro( fRegistro: NgForm ) {

    if (fRegistro.invalid) {
      this.uiService.alertaInformativa('Debes llenar todos los campos');
      return;
    }

    if ( this.nuevoPago.total <  this.sumaPagos) {
      return;
    }



    if (this.nuevoPago.total  ) {
      
    }
    
    if (this.nuevoPago.monto > this.faltante && this.faltante != 0) {
      this.uiService.alertaInformativa('No es posible asignar un monto mayor al faltante a pagar');
      return;
    } else if(this.nuevoPago.monto > this.nuevoPago.total) {
      this.uiService.alertaInformativa('No es posible asignar un monto mayor al total a pagar');
      return;
    }
    



    this.creando = true;
    const valido = await this.pagosService.crearPago(this.nuevoPago, this.idCliente);

    if (valido) {
      this.modalCtrl.dismiss();
      this.uiService.presentToast('Pago creado');
    }
   this.creando = false;

  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  cambio( event ){
    if ( this.nuevoPago.total <  this.sumaPagos) {
      this.invalido = true;
    } else {
      this.invalido = false;
      this.faltante = this.nuevoPago.total - this.sumaPagos
    }
  }

}
