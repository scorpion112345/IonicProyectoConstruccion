import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Cliente } from '../../interfaces/interfaces';
import { ClientesService } from '../../services/clientes.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { ClienteDetalleComponent } from '../cliente-detalle/cliente-detalle.component';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
})
export class ListaClientesComponent implements OnInit {

  @ViewChild('list') lista: IonList;

  @Input() clientes: Cliente[] = [];
  

  constructor(private clientesService: ClientesService,
              private alertController: AlertController,
              private modalCtrl: ModalController,
              private uiService: UiServiceService) { }

  ngOnInit() {}

  async verDetalle( cliente ){
    const modal = await this.modalCtrl.create({
      component: ClienteDetalleComponent,
      componentProps: {
        cliente
      }
    });
    modal.present();
    
  }

  async borrarCliente(idBorrar) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: 'Seguro que deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.lista.closeSlidingItems();
          }
        }, {
          text: 'Aceptar',
          handler: async (res) => {
            await this.clientesService.borrarCliente( idBorrar );
            this.lista.closeSlidingItems();
            setTimeout(() => {
              this.clientes = this.clientes.filter( cliente => cliente.id != idBorrar);
               this.uiService.presentToast('Cliente borrado con exito');
            }, 400);
            

          }
        }
      ]
    });

    await alert.present();
    
  }
}
