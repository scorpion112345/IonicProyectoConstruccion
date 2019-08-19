import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, AlertController, PopoverController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';
import { VestidosService } from 'src/app/services/vestidos.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild(IonSegment) segment: IonSegment;




  clientes: Cliente[] = [];
  textoBuscar = "";

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  }



  constructor( private vestidosService: VestidosService,
              private clientesService: ClientesService) {

  }

  ngOnInit() {
    this.getFullClientes();
    this.vestidosService.nuevoVestido
    .subscribe( resp => {
      this.getFullClientes();
    } )
  }

  recargar(event){
    this.getFullClientes();
  }

  buscar( event ){
    this.textoBuscar = event.detail.value;
  }

  getFullClientes() {
    this.clientesService.getFullClientes()
      .subscribe( (resp) => {
        this.clientes = resp.clientes;
      });
  }

 

}
