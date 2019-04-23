import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, AlertController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';
import { VestidosService } from 'src/app/services/vestidos.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
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

  constructor( private vestidosService: VestidosService,
              private uiService: UiServiceService,
              private alertController: AlertController) {

  }

  ngOnInit() {
    this.getVestidos();
  }

  segmentChanged($event) {

  }

  async registro( fRegistro: NgForm ) {
    
    if (fRegistro.invalid) { return;} 
    const valido = await this.vestidosService.creaVestido(this.nuevoVestido);

    if (valido) {
      this.getVestidos();
      this.segment.value = "vestidos";

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
