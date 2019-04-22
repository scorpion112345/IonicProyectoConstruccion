import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/interfaces';
import { IonSegment } from '@ionic/angular';
import { NgForm } from '@angular/forms';

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

  constructor( private clientesService: ClientesService) {

  }

  ngOnInit() {
    this.segment.value = 'clientes';
    this.clientesService.getClientes()
      .subscribe( (resp) => {
        console.log(resp.clientes);
        this.clientes = resp.clientes;
      })
  }

  segmentChanged($event) {

  }

  registro( fRegistro: NgForm ) {
    console.log(fRegistro.valid);
    
  }

}
