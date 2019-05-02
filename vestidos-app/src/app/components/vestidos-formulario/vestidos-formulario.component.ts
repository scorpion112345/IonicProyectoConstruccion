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

  tallas = ['Xs','S','M','G','XL','XXL'];
  complementos = [
    {
      val: 'Tiara',
      isChecked: false
    },
    {
      val: 'Aretes',
      isChecked: false
    },
    {
      val: 'Collar',
      isChecked: false
    },
    {
      val: 'Cojin',
      isChecked: false
    },
    {
      val: 'Bolero',
      isChecked: false
    },
    {
      val: 'Tutu',
      isChecked: false
    }
  ];

  listaDeComplementos: string = '';


  nuevoVestido: Vestido = {
    id: 0,
    modelo: '1',
    color: 'rojo',
    tela: 'tela',
    talla: 'Xs',
    complementos: 'Tiara',
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

    for (const complemento of this.complementos) {
      if (complemento.isChecked) {
        if (this.listaDeComplementos == '') {
          this.listaDeComplementos = complemento.val;
        } else {
          this.listaDeComplementos = this.listaDeComplementos + "," + complemento.val;
        }
      }
    }

    this.nuevoVestido.complementos = this.listaDeComplementos;    
    this.listaDeComplementos = '';

    const Creadovalido = await this.vestidosService.creaVestido(this.nuevoVestido, this.id);

    if (Creadovalido) {
      this.modalCtrl.dismiss();
      this.navCtrl.navigateForward(`tabs/tab2`);
      this.uiService.presentToast('Vestido creado con exito');
    }

    this.nuevoVestido = {};
  }



  regresar() {
    this.modalCtrl.dismiss();
   
  }

  onClick(){
    console.log(this.nuevoVestido);
  }
}
