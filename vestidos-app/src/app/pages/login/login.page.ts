import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  loginUser = {
    nombre: 'David',
    password: '123'
  }

  isLogin = false;

  constructor( private usuarioService: UsuariosService,
              private navCtrl: NavController,
              private uiservice: UiServiceService) { }

  ngOnInit() {
  }

  async login( fLogin: NgForm) {
  
    if (fLogin.invalid) {  return; }

    this.isLogin = true;
    const valido = await  this.usuarioService.login( this.loginUser.nombre, this.loginUser.password);

    if (valido) {
      console.log('es valido');
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true} );
    } else{
      // mostrar alerta de usuario y contrasena no correctos
      this.uiservice.alertaInformativa("Usuario y/o contraseña no son correctas.");
    }
    this.isLogin = false;

    console.log(this.loginUser);
  }


}
