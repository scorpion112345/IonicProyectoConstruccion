import { Injectable, EventEmitter } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

 loading;

  constructor(private alertController: AlertController,
    private toastController: ToastController,
    public loadingController: LoadingController) { }

    async alertaInformativa( message: string) {
      const alert = await this.alertController.create({
        message,
        cssClass: 'alert-danger',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async presentToast( message: string) {
      const toast = await this.toastController.create({
        message,
        position: 'top',
        duration: 1500
      });
      toast.present();
    }

    async presentLoading() {
       this.loading = await this.loadingController.create({
        message: 'Procesando...'
      });
      await this.loading.present();
  
      console.log('Loading dismissed!');
    }

}
