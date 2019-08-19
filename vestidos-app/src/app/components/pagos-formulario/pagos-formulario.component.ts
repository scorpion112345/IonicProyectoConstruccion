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

  invalidoMTotal = false;
  invalidoMFaltante= false;
  invalidoSumaPagos= false;




  nuevoPago: Pago = {
    monto: 0,
    fecha: '',
    total: 0
  };

  creando: boolean = false;
  fecha: Date = new Date();
  faltanteAux;


  constructor( private pagosService: PagosService,
                private modalCtrl: ModalController,
                private uiService: UiServiceService) { }

  ngOnInit() {
    this.nuevoPago.total = this.totalPagar || 0;
    console.log(this.faltante);
    this.faltanteAux = this.faltante;
    
  }

  async registro( fRegistro: NgForm ) {

    if (fRegistro.invalid) {
      this.uiService.alertaInformativa('Debes llenar todos los campos');
      return;
    }

    if(this.invalidoMTotal || this.invalidoMFaltante){
      this.uiService.alertaInformativa('Debes llenar el formulario correctamente');
      return;
    }

    if ( this.nuevoPago.total <  this.sumaPagos) {
      return;
    }

    this.creando = true;
    const valido = await this.pagosService.crearPago(this.nuevoPago, this.idCliente);

    if (valido) {
      this.uiService.presentToast('Pago creado');
    } else {
      this.uiService.presentToast('Ocurrio un error');

    }

    this.modalCtrl.dismiss();
   this.creando = false;

  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  totalChance( event ){

   

    if (this.sumaPagos == 0) {
      
    //Cuando el monto supera al total
      if ((this.nuevoPago.monto > this.nuevoPago.total)) {
        this.invalidoMTotal = true;
        this.faltante = 0;
      } else {
        this.invalidoMTotal = false;
        this.faltante = this.nuevoPago.total - this.nuevoPago.monto;
        this.faltanteAux = this.faltante;
      }

    } else {


      // Si se asigna un monto mayor al pagado por el cliente
      if (this.nuevoPago.total < this.sumaPagos) {
        this.invalidoSumaPagos=true;
        this.faltante = 0;
      } else {
        this.faltante = this.faltanteAux + (this.nuevoPago.total - this.totalPagar);
        this.invalidoSumaPagos=false;
      }

      if (this.invalidoMFaltante) {
        this.faltante = this.nuevoPago.total - this.nuevoPago.monto;
               
      }
      console.log(this.faltanteAux);
      
    }

  }

  ionBlurTotal( event) {
    if (this.nuevoPago.total > this.sumaPagos) {
        this.faltanteAux = this.faltante;
    } 
    
    
  }

  montoChange( event){   
    console.log(this.faltanteAux);
    
   
    if (this.nuevoPago.total >= this.nuevoPago.monto) {
      if (this.sumaPagos == 0) {
        this.faltante = this.nuevoPago.total - this.nuevoPago.monto;        
      } else {
        this.faltante = this.faltanteAux - (this.nuevoPago.monto ) ;
      }
    }
    

    if (this.sumaPagos == 0) {
    
      if ((this.nuevoPago.monto > this.nuevoPago.total)) {
        this.invalidoMTotal = true;
        this.faltante = 0;
      } else {
        this.invalidoMTotal = false;
      }

    } else {
      if ((this.nuevoPago.monto > this.faltanteAux)) { 
        this.faltante = this.faltanteAux;
        this.invalidoMFaltante=true;
      } else {
        this.invalidoMFaltante=false;
      }
    }

  }

}
