import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { CitasService } from '../../services/citas.service';
import { Cita, Cliente } from '../../interfaces/interfaces';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-citas-formulario',
  templateUrl: './citas-formulario.component.html',
  styleUrls: ['./citas-formulario.component.scss'],
})
export class CitasFormularioComponent implements OnInit {

  @Input() idCliente;
  cliente: Cliente;

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
    mensaje: '',
    fecha: ''
  }


  constructor(private modalCtrl: ModalController,
              private uiService: UiServiceService,
              private citasService: CitasService,
              private clienteService: ClientesService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.idCliente);
    this.fecha.setSeconds(0);
    this.getCliente(this.idCliente);
    
  }

  async  getCliente(idCliente) {
    await this.clienteService.getCliente(idCliente)
      .subscribe( (resp: any) => {
        this.cliente = resp.clientes;
        console.log(this.cliente);
      })
  }

  async registro( fRegistro: NgForm ) {



    const anio = this.fecha.getFullYear();
    const mes = this.fecha.getMonth() +1 ;
    const dia = this.fecha.getDate();
    const horas = this.fecha.getHours();
    let minutos = this.fecha.getMinutes();
    const ampm = horas >= 12 ? 'pm' : 'am';

   


    if(fRegistro.invalid) {return;}

    this.nuevaCita.fecha = `${anio}/${mes}/${dia}`;
    this.nuevaCita.hora = `${horas}:${minutos} ${ampm}`
    console.log(this.nuevaCita);
    console.log(minutos);

   this.creando = true;

   // Loading 
   const loading = await this.loadingController.create({
      message: 'Procesando...',
    });
  await loading.present();

    const valido = await this.citasService.crearCita(this.nuevaCita, this.idCliente);

    if (valido) {

      // Creacion del push
      this.nuevoPush.fecha = this.fecha.toString();
      this.nuevoPush.mensaje = `Cita con: ${this.cliente.nombre} ${this.cliente.apellidos} hoy a las: ${this.nuevaCita.hora}`
      await this.citasService.crearNotificacion( this.nuevoPush);
      this.uiService.presentToast('Cita creada');

    } else {
      this.uiService.alertaInformativa('Ocurrio un error');
    }

    loading.dismiss();

    this.modalCtrl.dismiss();
   this.creando = false;

  }

  cambioFecha ( event ){
    //console.log('ionChange',event);
    this.fecha.setSeconds(0);
    this.fecha = new Date( event.detail.value);
    console.log('Date', new Date( event.detail.value));
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
