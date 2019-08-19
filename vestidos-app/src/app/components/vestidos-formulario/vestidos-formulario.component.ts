import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { VestidosService } from 'src/app/services/vestidos.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-vestidos-formulario',
  templateUrl: './vestidos-formulario.component.html',
  styleUrls: ['./vestidos-formulario.component.scss'],
})
export class VestidosFormularioComponent implements OnInit {

  @Input() id;
  creando = false;

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
    modelo: '',
    color: '',
    tela: '',
    talla: 'Xs',
    complementos: '',
    estado: '',
    observaciones: '',
  }



  constructor(  private vestidosService: VestidosService,
                private modalCtrl: ModalController,
                private uiService: UiServiceService,
                public loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.id);
  }

  async registro( fRegistro: NgForm ) {
    
    if (fRegistro.invalid) {
      this.uiService.alertaInformativa("Debes llenar todos los campos");
      return;} 

    this.creando = true;
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

    // Loading 
   const loading = await this.loadingController.create({
    message: 'Procesando...',
  });
    const Creadovalido = await this.vestidosService.creaVestido(this.nuevoVestido, this.id);

    if (Creadovalido) {
      this.uiService.presentToast('Vestido creado con exito');
    } else{
      this.uiService.presentToast('Ocurrio un error');
    }

    loading.dismiss();
    this.modalCtrl.dismiss();
    this.creando = false;
    this.nuevoVestido = {};
  }



  regresar() {
    this.modalCtrl.dismiss();
   
  }

  onClick(){
    console.log(this.nuevoVestido);
  }
}
