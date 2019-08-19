import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, NavController, PopoverController } from '@ionic/angular';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  citas: Cita[] = [];
  
  bajar = false;
  idABajar = 0;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  @ViewChild(IonSegment) segment: IonSegment;

  constructor(private citasService: CitasService,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.citasService.getTodasLasCitas() 
      .subscribe( resp => {
        this.citas = resp.citas || [];
          console.log(resp);
      })
  }

  
  bajarCard(idBajar) {
    this.bajar = !this.bajar;
    this.idABajar = idBajar;
  }

  async verDetalle( id ) {
    this.navCtrl.navigateForward(`main/tabs/tab1/infoCliente/${id}`);

  }
  
}
