import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { VestidosService } from 'src/app/services/vestidos.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { AlertController, IonSegment } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-vestidos-formulario',
  templateUrl: './vestidos-formulario.component.html',
  styleUrls: ['./vestidos-formulario.component.scss'],
})
export class VestidosFormularioComponent implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  vestidos: Vestido[] = [];
  nuevoVestido: Vestido = {
    id: 0,
    modelo: '',
    color: '',
    tela: '',
    talla: '',
    complementos: '',
    estado: '',
    observaciones: '',
  }

  constructor(  private vestidosService: VestidosService,
                private uiService: UiServiceService,
                private alertController: AlertController ) { }

  ngOnInit() {
    this.getVestidos();
  }

  async registro( fRegistro: NgForm ) {
    
    if (fRegistro.invalid) { return;} 
    const valido = await this.vestidosService.creaVestido(this.nuevoVestido);

    if (valido) {
      this.getVestidos();
      this.nuevoVestido = {};
    }
  }

  getVestidos() {
    this.vestidosService.getVestidos()
      .subscribe( (resp) => {
        console.log(resp.vestidos);
        this.vestidos = resp.vestidos;
      });
  }

}
