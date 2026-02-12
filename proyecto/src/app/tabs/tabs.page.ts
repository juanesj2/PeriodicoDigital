import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonModal, IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline, searchOutline, closeOutline, checkmarkCircleOutline, pricetagOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, RouterLink, IonModal, IonContent, IonList, IonItem],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  // Variable para controlar el estado del modo oscuro (Dark Mode)
  esModoOscuro = false;
  colorActual: 'blue' | 'red' | 'green' | 'purple' = 'blue';

  // Estado del modal de categorías
  isModalOpen = false;

  // Categorías de GNews
  categorias: string[] = [
    'general',
    'world',
    'nation',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health'
  ];

  constructor(private router: Router) {
    // Registramos los iconos que utilizaremos en la interfaz
    addIcons({newspaperOutline,hardwareChipOutline,footballOutline,searchOutline,briefcaseOutline,videocamOutline,closeOutline,pricetagOutline,homeOutline,sunnyOutline,moonOutline,bookmarkOutline,checkmarkCircleOutline});

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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  seleccionarCategoria(categoria: string) {
    this.isModalOpen = false;
    // Navegar al buscador con la categoría seleccionada como parámetro
    this.router.navigate(['/tabs/buscador'], { queryParams: { category: categoria } });
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
 cambiarColor(color: 'blue' | 'red' | 'green' | 'purple') {
  this.colorActual = color;
  this.actualizarColor();
}

private actualizarColor() {
  document.body.classList.remove(
    'theme-blue',
    'theme-red',
    'theme-green',
    'theme-purple'
  );

  document.body.classList.add(`theme-${this.colorActual}`);
}
}
