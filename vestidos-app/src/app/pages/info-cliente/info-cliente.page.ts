import { Component, OnInit } from '@angular/core';
import { ClientesService } from './../../services/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente, Vestido } from '../../interfaces/interfaces';
import { VestidosService } from '../../services/vestidos.service';
import { ModalController, NavController } from '@ionic/angular';
import { VestidosFormularioComponent } from '../../components/vestidos-formulario/vestidos-formulario.component';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.page.html',
  styleUrls: ['./info-cliente.page.scss'],
})
export class InfoClientePage implements OnInit {

  cliente: any = {};


  constructor(  private route: ActivatedRoute,
                private clienteService: ClientesService,
                private vestidosService: VestidosService,
                 private modalCtrl: ModalController,
                 private navCtrl: NavController) { 
                }

  ngOnInit() {
    const idCliente = this.route.snapshot.paramMap.get('id');
    this.getCliente(idCliente);

    this.vestidosService.nuevoVestido
      .subscribe( () => {
        this.getCliente(idCliente);
      })
      
  }


 async  getCliente(idCliente) {
    await this.clienteService.getCliente(idCliente)
      .subscribe( (resp: any) => {        
        this.cliente = resp.clientes;
        console.log(this.cliente);
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

  formularioCita() {
  }



}
