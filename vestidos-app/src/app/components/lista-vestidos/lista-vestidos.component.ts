import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonList, NavController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';
import { Cliente } from '../../interfaces/interfaces';


@Component({
  selector: 'app-lista-vestidos',
  templateUrl: './lista-vestidos.component.html',
  styleUrls: ['./lista-vestidos.component.scss'],
})
export class ListaVestidosComponent implements OnInit {

  @ViewChild('list') lista: IonList;

  @Input() clientes: Cliente[] = [];


  constructor( private navCtrl: NavController) { }

  ngOnInit() {
    console.log(this.clientes);
    
  }

  verDetalle( id) {
    this.navCtrl.navigateRoot(`main/tabs/tab2/infoVestido/${id}`);
  }
}
