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
    console.log(this.idCliente);
    
  }

  async registro( fRegistro: NgForm ) {

    if (fRegistro.invalid) {return;}

  
    this.creando = true;
    const valido = await this.pagosService.crearPago(this.nuevoPago, this.idCliente);

    if (valido) {
      this.modalCtrl.dismiss();
      this.uiService.presentToast('Pago creado');
    }
   this.creando = false;

    
  }

}
