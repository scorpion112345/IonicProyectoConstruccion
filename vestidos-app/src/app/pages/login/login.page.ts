import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { NavController, IonSlides } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    nombre: 'David',
    password: '123'
  }

  slideOpts = {
    zoom: false
  }

  isLogin = false;

  constructor( private usuarioService: UsuariosService,
              private navCtrl: NavController,
              private uiservice: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm) {
  
    if (fLogin.invalid) {  return; }

    this.isLogin = true;
    const valido = await  this.usuarioService.login( this.loginUser.nombre, this.loginUser.password);

    if (valido) {
      console.log('es valido');
      if (this.usuarioService.usuario.tipo == 'ADMIN') {
        this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true} );
      } else  if (this.usuarioService.usuario.tipo == 'NORMAL')  {
        this.navCtrl.navigateRoot( '/main/tabs/tab2', { animated: true} );

      }
      // navegar al tabs
    } else{
      // mostrar alerta de usuario y contrasena no correctos
      this.uiservice.alertaInformativa("Usuario y/o contraseña no son correctas.");
    }
    this.isLogin = false;

    console.log(this.loginUser);
  }


}
