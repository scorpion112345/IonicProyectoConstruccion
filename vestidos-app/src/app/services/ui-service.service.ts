import { Injectable, EventEmitter } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UiServiceService {


  constructor(private alertController: AlertController,
    private toastController: ToastController) { }

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

}
