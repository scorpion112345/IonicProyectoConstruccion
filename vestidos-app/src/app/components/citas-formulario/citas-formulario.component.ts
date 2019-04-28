import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../interfaces/interfaces';

@Component({
  selector: 'app-citas-formulario',
  templateUrl: './citas-formulario.component.html',
  styleUrls: ['./citas-formulario.component.scss'],
})
export class CitasFormularioComponent implements OnInit {

  @Input() idCliente;

  fecha: Date = new Date();
// tslint:disable-next-line: max-line-length
  monthNames: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Obtubre', 'Noviembre', 'Diciembre' ]
  tipos = ['Presupuesto','Prueba','Entrega'];

  creando = false;  

  nuevaCita: Cita = {
    hora: '',
    tipo_cita: 'Presupuesto'
  };

  nuevoPush = {
    mensaje: 'Que pedo brother',
    fecha: ''
  }


  constructor(private modalCtrl: ModalController,
              private uiService: UiServiceService,
              private citasService: CitasService) { }

  ngOnInit() {
    console.log(this.idCliente);
    this.fecha.setSeconds(0);
    
  }

  async registro( fRegistro: NgForm ) {



    const anio = this.fecha.getFullYear();
    const mes = this.fecha.getMonth() +1 ;
    const dia = this.fecha.getDate();
    const horas = this.fecha.getHours();
    const minutos = this.fecha.getMinutes();
    const ampm = horas >= 12 ? 'pm' : 'am';


    //if (fRegistro.invalid) {return;}

    this.nuevaCita.fecha = `${anio}/${mes}/${dia}`;
    this.nuevaCita.hora = `${horas}:${minutos} ${ampm}`
    console.log(this.nuevaCita);
    


   this.creando = true;
    const valido = await this.citasService.crearCita(this.nuevaCita, this.idCliente);

    if (valido) {
      this.uiService.presentToast('Cita creada');

      // Creacion del push
      this.nuevoPush.fecha = this.fecha.toString();
      const pushValido = await this.citasService.crearNotificacion( this.nuevoPush);
      this.modalCtrl.dismiss();


    } else {
      this.uiService.alertaInformativa('Ocurrio un error');
    }
   this.creando = false;

  }

  cambioFecha ( event ){
    //console.log('ionChange',event);
    this.fecha.setSeconds(0);
    this.fecha = new Date( event.detail.value);
    console.log('Date', new Date( event.detail.value));
  }

}
