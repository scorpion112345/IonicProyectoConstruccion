import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: string = null;

  constructor( private http: HttpClient, 
                private storage: Storage,
                private navCtrl: NavController) { }


  logOut() {
    this.token = null;
    this.storage.clear();
    this.navCtrl.navigateBack('/login', {animated: true});
  }

  login( nombre: string, password:string) {
    const data = {nombre, password};

    return new Promise( resolve => {

      this.http.post( `${URL}/user/login`, data)
      .subscribe( async resp => {
        console.log(resp);

        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });

    });
  }


  async  guardarToken( token: string) {
    this.token = token;
    await  this.storage.set('token', token);
    await this.validaToken();
  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      resolve(true);
    });
  }


  async  cargarToken() {
    this.token = await this.storage.get('token') || null;
 }
}
