import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  configuracionInicial() {
    
this.oneSignal.startInit('869cc7da-0fef-4edc-8a31-a263b4087c5e', '1067581682182');

this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

this.oneSignal.handleNotificationReceived().subscribe(( noti ) => {
 // do something when notification is received
 console.log('Notificaion recivida', noti);
 
});

this.oneSignal.handleNotificationOpened().subscribe(( noti ) => {
  // do something when a notification is opened
 console.log('Notificaion abierta', noti);

});

this.oneSignal.endInit();
  }
}
