import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo-usuario',
  templateUrl: './popinfo-usuario.component.html',
  styleUrls: ['./popinfo-usuario.component.scss'],
})
export class PopinfoUsuarioComponent implements OnInit {

  constructor( private usuariosServide: UsuariosService,
    
    private popoverCtrl: PopoverController) { }

  ngOnInit() {}


  logOut() {
    this.usuariosServide.logOut();
    this.popoverCtrl.dismiss();

  }

}
