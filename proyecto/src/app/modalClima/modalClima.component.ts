import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'climaModal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>CLIMA</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>{{ clima?.location || 'Ubicación desconocida' }}</h2>
      <p>🌡 Temperatura: {{ clima?.temperature }} °C</p>
      <p>💨 Velocidad del viento: {{ clima?.windspeed }} km/h</p>

      <ion-button expand="block" (click)="cerrar()">Cerrar</ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton]
})
export class ClimaModalComponent {
  @Input() clima: any;

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}