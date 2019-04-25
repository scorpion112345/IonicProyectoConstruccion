import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { VestidosService } from '../../services/vestidos.service';
import { Vestido } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-info-vestido',
  templateUrl: './info-vestido.page.html',
  styleUrls: ['./info-vestido.page.scss'],
})
export class InfoVestidoPage implements OnInit {

  actualVestido: Vestido = {
    estado: '',
    observaciones: ''
  };

  @Input () id;
  
  @ViewChild(IonSegment) segment: IonSegment;

  vestido: Vestido = {};
  creando: boolean = false;

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

  async actualizaVestido( fRegistro ) {
    if (fRegistro.invalid) { return;}
    this.actualVestido.id = this.id;

    this.creando = true;
    const valido = await this.vestidosService.actualizaVestido(this.actualVestido, this.id);

    if (valido) {
      console.log('Funciona')
    }
    this.creando = false;
  }



}
