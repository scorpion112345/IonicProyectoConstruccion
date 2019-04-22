import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Cliente } from '../../interfaces/interfaces';
import { ClientesService } from '../../services/clientes.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { ClienteDetalleComponent } from '../cliente-detalle/cliente-detalle.component';

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
              private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle( id ){
    const modal = await this.modalCtrl.create({
      component: ClienteDetalleComponent,
      componentProps: {
        id
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
            this.clientes = this.clientes.filter( cliente => cliente.id != idBorrar);
            this.lista.closeSlidingItems();

          }
        }
      ]
    });

    await alert.present();
    
  }
}
