import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonIcon, IonItem, IonLabel, ModalController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { waterOutline, thermometerOutline, leafOutline, sunnyOutline, moonOutline, cloudOutline, rainyOutline, thunderstormOutline, snowOutline } from 'ionicons/icons';

@Component({
  selector: 'climaModal',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>El Tiempo Actual</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="weather-card">
        <ion-card-header>
          <ion-icon [name]="iconoClima" color="primary" class="main-icon"></ion-icon>
          <ion-card-subtitle>{{ clima?.location || 'Ubicación Desconocida' }}</ion-card-subtitle>
          <ion-card-title>{{ descripcionClima }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item lines="none">
            <ion-icon name="thermometer-outline" slot="start" color="danger"></ion-icon>
            <ion-label>
              <h2>{{ clima?.temperature }} °C</h2>
              <p>Temperatura</p>
            </ion-label>
          </ion-item>

          <ion-item lines="none">
            <ion-icon name="leaf-outline" slot="start" color="success"></ion-icon>
            <ion-label>
              <h2>{{ clima?.windspeed }} km/h</h2>
              <p>Velocidad Viento</p>
            </ion-label>
          </ion-item>
          
          <ion-item lines="none" *ngIf="clima?.winddirection !== undefined">
            <ion-icon name="compass-outline" slot="start" color="tertiary"></ion-icon>
            <ion-label>
              <h2>{{ clima?.winddirection }}°</h2>
              <p>Dirección Viento</p>
            </ion-label>
          </ion-item>

        </ion-card-content>
      </ion-card>

      <ion-button expand="block" shape="round" color="primary" class="ion-margin-top" (click)="cerrar()">
        Cerrar
      </ion-button>
    </ion-content>
  `,
  styles: [`
    .weather-card {
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      text-align: center;
      margin-top: 20px;
      background: var(--ion-color-step-50, #ffffff);
      color: var(--ion-text-color, #000000);
    }
    .weather-card ion-card-header {
      padding-top: 30px;
      padding-bottom: 10px;
    }
    .main-icon {
      font-size: 80px;
      margin-bottom: 10px;
    }
    .weather-card ion-card-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 10px;
      text-transform: capitalize;
    }
    .weather-card ion-item {
      --background: transparent;
      margin-top: 10px;
    }
    .weather-card h2 {
      font-weight: bold;
      font-size: 1.3rem;
    }
  `],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonIcon, IonItem, IonLabel
  ],
  providers: [ModalController]
})
export class ClimaModalComponent implements OnInit {
  @Input() clima: any;
  
  descripcionClima: string = 'Despejado';
  iconoClima: string = 'sunny-outline';

  constructor(private modalCtrl: ModalController) {
    addIcons({ waterOutline, thermometerOutline, leafOutline, sunnyOutline, moonOutline, cloudOutline, rainyOutline, thunderstormOutline, snowOutline, 'compass-outline': leafOutline }); 
    // Mapeamos 'compass-outline' a 'leaf-outline' de momento si no está importado, o podríamos importarlo. 
    // Lo corregiremos en el import
  }

  ngOnInit() {
    this.interpretarClima();
  }

  interpretarClima() {
    if (!this.clima) return;

    const isDay = this.clima.is_day === 1;
    const code = this.clima.weathercode;

    // Interpretación de códigos WMO
    if (code === 0) {
      this.descripcionClima = 'Despejado';
      this.iconoClima = isDay ? 'sunny-outline' : 'moon-outline';
    } else if (code === 1 || code === 2 || code === 3) {
      this.descripcionClima = 'Parcialmente Nublado';
      this.iconoClima = 'cloud-outline';
    } else if (code >= 45 && code <= 48) {
      this.descripcionClima = 'Niebla';
      this.iconoClima = 'cloud-outline';
    } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      this.descripcionClima = 'Lluvia';
      this.iconoClima = 'rainy-outline';
    } else if (code >= 71 && code <= 77) {
      this.descripcionClima = 'Nieve';
      this.iconoClima = 'snow-outline';
    } else if (code >= 95 && code <= 99) {
      this.descripcionClima = 'Tormenta';
      this.iconoClima = 'thunderstorm-outline';
    } else {
      this.descripcionClima = 'Desconocido';
      this.iconoClima = 'thermometer-outline';
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}