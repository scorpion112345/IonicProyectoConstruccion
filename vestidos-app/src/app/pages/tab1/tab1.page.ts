import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/interfaces';
import { IonSegment, AlertController, IonList } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

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

  constructor( private clientesService: ClientesService,
              private uiService: UiServiceService) {

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
    const valido = await this.clientesService.creaCliente(this.nuevoCliente);

    if (valido) {
      this.getClientes();
      this.segment.value = "clientes";
      this.nuevoCliente = {};

    }
  }

  getClientes() {
    this.clientesService.getClientes()
      .subscribe( (resp) => {
        this.clientes = resp.clientes;
      });
  }



 

}
