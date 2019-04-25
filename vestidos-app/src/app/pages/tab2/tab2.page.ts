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


  constructor( private vestidosService: VestidosService,
              private uiService: UiServiceService,
              private alertController: AlertController) {

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

 

}
