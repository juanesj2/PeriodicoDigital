import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  constructor() {
    // Registramos los iconos que utilizaremos en la interfaz
    addIcons({ homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline });
    
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

  /**
   * Aplica la clase CSS correspondiente al body del documento
   * para cambiar visualmente el tema de la aplicación.
   */
  private actualizarTema() {
    document.body.classList.toggle('dark', this.esModoOscuro);
    document.body.classList.toggle('light', !this.esModoOscuro);
  }
}
