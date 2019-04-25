import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { IonicModule } from '@ionic/angular';
import { ListaVestidosComponent } from './lista-vestidos/lista-vestidos.component';
import { VestidosFormularioComponent } from './vestidos-formulario/vestidos-formulario.component';
import { FormsModule } from '@angular/forms';
import { PagosFormularioComponent } from './pagos-formulario/pagos-formulario.component';


@NgModule({
  entryComponents: [
    VestidosFormularioComponent,
    PagosFormularioComponent
  ],
  declarations: [
    ListaVestidosComponent,
    ListaClientesComponent,
    VestidosFormularioComponent,
    PagosFormularioComponent
  ],
  exports: [
    ListaVestidosComponent,
    ListaClientesComponent,
    VestidosFormularioComponent,
    PagosFormularioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
