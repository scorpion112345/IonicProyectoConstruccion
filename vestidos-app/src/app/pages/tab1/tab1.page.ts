import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/interfaces';
import { IonSegment, PopoverController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PopinfoUsuarioComponent } from '../../components/popinfo-usuario/popinfo-usuario.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonSegment) segment: IonSegment;




  clientes: Cliente[] = [];
  nuevoCliente: Cliente = {
    nombre: '',
    apellidos: '',
    telefono: '',
  }

  creando: boolean = false;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  constructor( private clientesService: ClientesService,
              private uiService: UiServiceService,
              
              private popoverCtrl: PopoverController) {

  }

  ngOnInit() {
    this.segment.value = 'clientes';
    this.getClientes();
  }

  segmentChanged($event) {
    this.getClientes();
  }

  async registro( fRegistro: NgForm ) {
    
    if (fRegistro.invalid) { 
      this.uiService.alertaInformativa("Debes llenar todos los campos");
      return;
    } 

    this.creando = true;
    const valido = await this.clientesService.creaCliente(this.nuevoCliente);

    if (valido) {

      this.getClientes();
      this.segment.value = "clientes";
      this.uiService.presentToast('Ciente creado con exito');
      this.nuevoCliente = {};
    }
    this.creando = false;
  }

  getClientes() {
    this.clientesService.getClientes()
      .subscribe( (resp) => {
        this.clientes = resp.clientes;
      });
  }

  clientesBorados( event) {
    if (event) {
      this.clientes = [];
    }
  }

  async  mostrarPop( evento ) { 

    const popover = await this.popoverCtrl.create({
      component: PopinfoUsuarioComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: true,
      cssClass:"popinfo"
    });

    await popover.present();
    
  }



 

}
