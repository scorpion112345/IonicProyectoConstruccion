import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../../interfaces/interfaces';
import { ClientesService } from '../../services/clientes.service';
import { AlertController, IonList, ModalController, NavController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
})
export class ListaClientesComponent implements OnInit {

  @ViewChild('list') lista: IonList;

  @Input() clientes: Cliente[] = [];
  @Output() borrado = new EventEmitter<boolean>();;
  

  constructor(private clientesService: ClientesService,
              private alertController: AlertController,
              private uiService: UiServiceService,
              private navCtrl: NavController) { }

  ngOnInit() {}

  async verDetalle( id ) {
    //console.log(id)
    this.navCtrl.navigateForward(`main/tabs/tab1/infoCliente/${id}`);

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
              if (this.clientes.length == 0) {
                this.borrado.emit(true);
              }
               this.uiService.presentToast('Cliente borrado con exito');
            }, 350);
          }
        }
      ]
    });

    await alert.present();
    
  }
}
