import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;

  constructor(private usuariosServide: UsuariosService) { }

  ngOnInit() {}

  logOut( $event){
    this.usuariosServide.logOut();
  }

}
