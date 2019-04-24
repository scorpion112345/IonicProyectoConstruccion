import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { VestidosService } from 'src/app/services/vestidos.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ModalController,NavController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-vestidos-formulario',
  templateUrl: './vestidos-formulario.component.html',
  styleUrls: ['./vestidos-formulario.component.scss'],
})
export class VestidosFormularioComponent implements OnInit {

  @Input() id;

  nuevoVestido: Vestido = {
    id: 0,
    modelo: '1',
    color: 'rojo',
    tela: 'tela',
    talla: 'Xs',
    complementos: 'Com',
    estado: 'empezado',
    observaciones: 'o lo se',
  }

  constructor(  private vestidosService: VestidosService,
                private modalCtrl: ModalController,
                private uiService: UiServiceService,
                private navCtrl: NavController) { }

  ngOnInit() {
    console.log(this.id);
    
  }

  async registro( fRegistro: NgForm ) {
    
    if (fRegistro.invalid) { return;} 

    const valido = await this.vestidosService.creaVestido(this.nuevoVestido, this.id);

    if (valido) {
      this.nuevoVestido = {};
      this.modalCtrl.dismiss();
      this.navCtrl.navigateForward(`tabs/tab2`);
    }
  }



  regresar() {
    this.modalCtrl.dismiss();
   
  }

  onClick(){
    console.log(this.nuevoVestido);
  }
}
