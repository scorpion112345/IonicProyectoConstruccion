import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonList, AlertController, ModalController } from '@ionic/angular';
import { Vestido } from 'src/app/interfaces/interfaces';
import { VestidosService } from 'src/app/services/vestidos.service';

@Component({
  selector: 'app-lista-vestidos',
  templateUrl: './lista-vestidos.component.html',
  styleUrls: ['./lista-vestidos.component.scss'],
})
export class ListaVestidosComponent implements OnInit {

  @ViewChild('list') lista: IonList;

  @Input() vestidos: Vestido[] = [];


  constructor( private clientesService: VestidosService,
    private alertController: AlertController,
    private modalCtrl: ModalController ) { }

  ngOnInit() {}

}
