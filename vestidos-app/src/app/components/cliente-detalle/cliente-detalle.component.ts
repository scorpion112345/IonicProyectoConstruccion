import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss'],
})
export class ClienteDetalleComponent implements OnInit {

  @Input() id;
  cliente: Cliente = {};

  constructor( private clientesService: ClientesService) { }

  ngOnInit() {
    console.log(this.id);
    this.clientesService.getCliente( this.id )
      .subscribe( (cli: any) => {
        console.log(cli.cliente);
        
       this.cliente = cli.cliente;
        //console.log(this.cliente);
      })

  }

}
