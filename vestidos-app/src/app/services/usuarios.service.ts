import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: string = null;
  usuario: Usuario;

  constructor( private http: HttpClient, 
                private storage: Storage,
                private navCtrl: NavController) { }


   logOut() {
    this.navCtrl.navigateBack('/login', {animated: true})

    setTimeout(() => {
      this.token = null;
      this.usuario = null;
      this.storage.clear();
    }, 500);
      
  
  }

  login( nombre: string, password:string) {
    const data = {nombre, password};

    return new Promise( resolve => {

      this.http.post( `${URL}/user/login`, data)
      .subscribe( async resp => {
        //console.log(resp);

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

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get( `${URL}/user`, {headers})
        .subscribe( resp => {
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            console.log(this.usuario);
            
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        })
    })
  }


  async  cargarToken() {
    this.token = await this.storage.get('token') || null;
 }
}
