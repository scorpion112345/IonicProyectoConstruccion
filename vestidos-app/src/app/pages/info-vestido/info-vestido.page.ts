import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { VestidosService } from '../../services/vestidos.service';
import { Vestido } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UiServiceService } from '../../services/ui-service.service';



@Component({
  selector: 'app-info-vestido',
  templateUrl: './info-vestido.page.html',
  styleUrls: ['./info-vestido.page.scss'],
})
export class InfoVestidoPage implements OnInit {

  
  @ViewChild(IonSegment) segment: IonSegment;

  vestido: Vestido = {
    complementos: '',
    observaciones:''
  };
  creando: boolean = false;

  
  actualVestido: Vestido = {
    estado: '',
    observaciones: ''
  };

  constructor( private vestidosService: VestidosService,
                private route: ActivatedRoute,
                private uiService: UiServiceService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.segment.value = 'vestido';
    
    this.getvestido(id);

    this.vestidosService.nuevoVestido 
      .subscribe(() => {
        this.getvestido(id);
      });



  }

  async actualizaVestido( fRegistro ) {
    if (fRegistro.invalid) { 
      this.uiService.alertaInformativa("El campo 'Estado' no puede estar vacio"); 
      return;}

    console.log(this.vestido.id);
    console.log(this.actualVestido);

    this.creando = true;
    const valido = await this.vestidosService.actualizaVestido(this.actualVestido, this.vestido.id);

    if (valido) {
      this.uiService.presentToast('Vestido actualizado');
      this.segment.value = 'vestido';
    } else {
      this.uiService.alertaInformativa('Ocurrio un error'); 
    }
    this.creando = false;

  }

  getvestido(id) {
    this.vestidosService.getVestido(Number(id))
      .subscribe( resp => {
        this.vestido = resp.vestidos[0];
        this.actualVestido.estado = this.vestido.estado;
        this.actualVestido.observaciones = this.vestido.observaciones;
      })
  }



}
