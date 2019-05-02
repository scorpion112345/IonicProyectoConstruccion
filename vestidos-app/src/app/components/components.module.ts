import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { IonicModule } from '@ionic/angular';
import { ListaVestidosComponent } from './lista-vestidos/lista-vestidos.component';
import { VestidosFormularioComponent } from './vestidos-formulario/vestidos-formulario.component';
import { FormsModule } from '@angular/forms';
import { PagosFormularioComponent } from './pagos-formulario/pagos-formulario.component';
import { CitasFormularioComponent } from './citas-formulario/citas-formulario.component';
import { ListaPagosComponent } from './lista-pagos/lista-pagos.component';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';



@NgModule({
  entryComponents: [
    VestidosFormularioComponent,
    PagosFormularioComponent,
    CitasFormularioComponent
  ],
  declarations: [
    ListaVestidosComponent,
    ListaClientesComponent,
    VestidosFormularioComponent,
    PagosFormularioComponent,
    CitasFormularioComponent,
    ListaPagosComponent,
    ListaCitasComponent
  ],
  exports: [
    ListaVestidosComponent,
    ListaClientesComponent,
    VestidosFormularioComponent,
    PagosFormularioComponent,
    CitasFormularioComponent,
    ListaPagosComponent,
    ListaCitasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
