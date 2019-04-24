import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { IonicModule } from '@ionic/angular';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { ListaVestidosComponent } from './lista-vestidos/lista-vestidos.component';
import { VestidosFormularioComponent } from './vestidos-formulario/vestidos-formulario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  entryComponents: [
    ClienteDetalleComponent
  ],
  declarations: [
    ListaVestidosComponent,
    ListaClientesComponent,
    ClienteDetalleComponent,
    VestidosFormularioComponent
  ],
  exports: [
    ListaVestidosComponent,
    ListaClientesComponent,
    VestidosFormularioComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
