import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { IonicModule } from '@ionic/angular';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { ListaVestidosComponent } from './lista-vestidos/lista-vestidos.component';

@NgModule({
  entryComponents: [
    ClienteDetalleComponent
  ],
  declarations: [
    ListaVestidosComponent,
    ListaClientesComponent,
    ClienteDetalleComponent
  ],
  exports: [
    ListaVestidosComponent,
    ListaClientesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
