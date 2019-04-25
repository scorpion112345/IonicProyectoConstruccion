import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { VestidosService } from '../../services/vestidos.service';
import { Vestido } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-vestido',
  templateUrl: './info-vestido.page.html',
  styleUrls: ['./info-vestido.page.scss'],
})
export class InfoVestidoPage implements OnInit {

  
  @ViewChild(IonSegment) segment: IonSegment;

  vestido: Vestido = {};

  constructor( private vestidosService: VestidosService,
                private route: ActivatedRoute,) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.segment.value = 'vestido';
    this.vestidosService.getVestido(Number(id))
      .subscribe( resp => {
        this.vestido = resp.vestidos[0];
        console.log(this.vestido);

      })

  }

  actualizaVestido( fRegistro ) {
    if (fRegistro.invalid) { return;}
  }



}
