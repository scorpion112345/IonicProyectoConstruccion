import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {



    constructor( public usuarioService: UsuariosService) {
      console.log(usuarioService.usuario.tipo);
      
    }



}
