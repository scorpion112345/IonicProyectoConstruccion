import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente, Vestido } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { VestidosService } from '../../services/vestidos.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss'],
})
export class ClienteDetalleComponent implements OnInit {
  

  @Input() cliente: Cliente;
  vestido: Vestido = {};


  constructor( private clientesService: ClientesService,
              private modalCtrl: ModalController,
              private vestidosService: VestidosService) { }

  ngOnInit() {
    console.log('Cliente',this.cliente);
      this.getInfoVestido();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  
  


  getInfoVestido() {
    this.vestidosService.getVestido( this.cliente.id_vestido)
        .subscribe( vestido => {
          this.vestido = vestido.vestidos[0];
          console.log('Vestido', this.vestido);
        })
  }


  vestidoDetalle( idVestido) {
    console.log(idVestido);
    
  }

}
