import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline, rainyOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { ClimaModalComponent } from '../modalClima/modalClima.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, RouterLink],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  
  // Variable para controlar el estado del modo oscuro (Dark Mode)
  esModoOscuro = false;

  constructor(private http: HttpClient, private modalCtrl: ModalController) {
    // Registramos los iconos que utilizaremos en la interfaz
    addIcons({ homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline, rainyOutline});
    
    // Detectamos la preferencia de color del sistema (claro u oscuro)
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)');
    this.esModoOscuro = prefiereOscuro.matches;
    this.actualizarTema(); 

    // Escuchamos cambios en la preferencia del sistema mientras la app está abierta
    prefiereOscuro.addEventListener('change', (mediaQuery) => {
      this.esModoOscuro = mediaQuery.matches;
      this.actualizarTema();
    });
  }

  /**
   * Alterna entre el tema claro y oscuro.
   * Se llama cuando el usuario pulsa el botón de cambio de tema.
   */
  alternarTema() {
    this.esModoOscuro = !this.esModoOscuro;
    this.actualizarTema();
  }

  //Abre el modal del clima. Se llama cuando se pulsa el botón del clima
  async abrirClima() {
    try {
    //Pedimos permisos (Casi me mato para conseguir hacer esto)
    const status = await Geolocation.checkPermissions();
    if (status.location !== 'granted') {
      const permiso = await Geolocation.requestPermissions();
      if (permiso.location !== 'granted') {
        alert('Danos permiso de ubicación para ver el clima');
        return;
      }
    }

    //Obtenemos la localización (He instalado el geolocation con el capacitor)
    const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000,});
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    //Llamamos a la API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    
    const respuesta: any = await firstValueFrom(this.http.get(url));

    //Estos son los datos que aparecerán en el modal
    const clima = {
      location: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`,
      temperature: respuesta.current_weather.temperature,
      windspeed: respuesta.current_weather.windspeed
    };

    //Abrimos el modal
    const modal = await this.modalCtrl.create({
      component: ClimaModalComponent,
      componentProps: { clima }
    });

    await modal.present();

    //Controlamos la excepción para que no dé error
  } catch (error) {
    console.error('Error obteniendo clima:', error);
    alert('No se pudo obtener el clima. Activa la ubicación.');
  }
  }

  /**
   * Aplica la clase CSS correspondiente al body del documento
   * para cambiar visualmente el tema de la aplicación.
   */
  private actualizarTema() {
    document.body.classList.toggle('dark', this.esModoOscuro);
    document.body.classList.toggle('light', !this.esModoOscuro);
  }
}
