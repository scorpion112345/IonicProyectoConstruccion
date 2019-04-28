import { Component, OnInit } from '@angular/core';
import { ClientesService } from './../../services/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente, Vestido, Pago, Cita } from '../../interfaces/interfaces';
import { VestidosService } from '../../services/vestidos.service';
import { ModalController, NavController } from '@ionic/angular';
import { VestidosFormularioComponent } from '../../components/vestidos-formulario/vestidos-formulario.component';
import { PagosService } from '../../services/pagos.service';
import { PagosFormularioComponent } from '../../components/pagos-formulario/pagos-formulario.component';
import { CitasFormularioComponent } from '../../components/citas-formulario/citas-formulario.component';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.page.html',
  styleUrls: ['./info-cliente.page.scss'],
})
export class InfoClientePage implements OnInit {

  cliente: any = {};
  pagos: Pago[] = [];
  citas: Cita[] = [];

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor(  private route: ActivatedRoute,
                private clienteService: ClientesService,
                private vestidosService: VestidosService,
                 private modalCtrl: ModalController,
                 private navCtrl: NavController,
                 private pagosService: PagosService,
                 private citasService: CitasService) { 
                }

  ngOnInit() {
    const idCliente = this.route.snapshot.paramMap.get('id');

    this.getCliente(idCliente);


    this.vestidosService.nuevoVestido
      .subscribe( () => {
        this.getCliente(idCliente);
      })

    this.pagosService.nuevoPago
      .subscribe( pago => {
        this.pagos.push(pago);
      })

      
  }


 async  getCliente(idCliente) {
    await this.clienteService.getCliente(idCliente)
      .subscribe( (resp: any) => {        
        this.cliente = resp.clientes;
        console.log(this.cliente);
        this.getPagos();

      this.citasService.getCitasPorCliente(this.cliente.id)
        .subscribe( resp => {
          console.log(resp.citas);
          //this.citas = resp.citas;
        })


      })
  }

  

  vestidoDetalle( idVestido) {
    this.navCtrl.navigateRoot(`tabs/tab2/infoVestido/${idVestido}`, { animated: true});
  }

  async formularioVestido(id){
    
    const modal = await this.modalCtrl.create({
      component: VestidosFormularioComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

  async citasFormulario( idCliente ) {
    const modal = await this.modalCtrl.create({
      component: CitasFormularioComponent,
      componentProps: {
        idCliente
      }
    });
    modal.present();
  }

  getPagos() {
    this.pagosService.getPagosPorCliente(this.cliente.id)
      .subscribe( resp => {
        this.pagos = resp.pagos;
        console.log(this.pagos);
      })
  }

  verDetallePagos( idPago) {
    console.log(idPago);
    
  }

 async pagosFormulario( idCliente ) {
    const modal = await this.modalCtrl.create({
      component: PagosFormularioComponent,
      componentProps: {
        idCliente
      }
    });
    modal.present();
  }


}
