import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CitasFormularioComponent } from '../citas-formulario/citas-formulario.component';
import { Cita } from '../../interfaces/interfaces';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss'],
})
export class ListaCitasComponent implements OnInit {

  @Input() clienteId;
  @Input()  citas: Cita[] = [];

  bajar = false;
  idABajar = 0;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  constructor(  private modalCtrl: ModalController,
                private citasService: CitasService) { }

  ngOnInit() {

    this.citasService.nuevaCita
    .subscribe( cita => {
      this.citas.push(cita);
    })
  }

  async citasFormulario( idCliente ) {
    const modal = await this.modalCtrl.create({
      component: CitasFormularioComponent,
      componentProps: {
        idCliente
      }
    });
    modal.present();
  }

  bajarCard(idBajar) {
    this.bajar = !this.bajar;
    this.idABajar = idBajar;
  }

}
