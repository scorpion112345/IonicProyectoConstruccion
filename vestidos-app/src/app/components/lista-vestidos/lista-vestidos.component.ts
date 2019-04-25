import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonList, NavController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-lista-vestidos',
  templateUrl: './lista-vestidos.component.html',
  styleUrls: ['./lista-vestidos.component.scss'],
})
export class ListaVestidosComponent implements OnInit {

  @ViewChild('list') lista: IonList;

  @Input() vestidos: Vestido[] = [];


  constructor( private navCtrl: NavController) { }

  ngOnInit() {}

  verDetalle( id) {
    this.navCtrl.navigateRoot(`tabs/tab2/infoVestido/${id}`);
  }
}
