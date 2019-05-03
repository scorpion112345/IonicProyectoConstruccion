import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, AlertController, PopoverController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';
import { VestidosService } from 'src/app/services/vestidos.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm } from '@angular/forms';
import { PopinfoUsuarioComponent } from '../../components/popinfo-usuario/popinfo-usuario.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild(IonSegment) segment: IonSegment;




  vestidos: Vestido[] = [];

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  }



  constructor( private vestidosService: VestidosService,
              private popoverCtrl: PopoverController) {

  }

  ngOnInit() {
    this.getVestidos();
    this.vestidosService.nuevoVestido
    .subscribe( resp => {
      this.getVestidos();
    } )
  }

  segmentChanged($event) {

  }

  getVestidos() {
    this.vestidosService.getVestidos()
      .subscribe( (resp) => {
        console.log(resp.vestidos);
        this.vestidos = resp.vestidos;
      });
  }
  async  mostrarPop( evento ) { 

    const popover = await this.popoverCtrl.create({
      component: PopinfoUsuarioComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: true,
      cssClass:"popinfo"
    });

    await popover.present();

   /*  const { data } = await popover.onDidDismiss(); */
   const { data } = await popover.onWillDismiss();
    console.log('Padre', data);
    
  }

 

}
