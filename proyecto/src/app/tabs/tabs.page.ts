import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonModal, IonContent, IonList, IonItem, IonMenu, IonMenuButton, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline, searchOutline, closeOutline, checkmarkCircleOutline, paw, helpCircle, menu } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, RouterLink, IonModal, IonContent, IonList, IonItem, IonMenu, IonMenuButton, IonMenuToggle],
})
export class TabsPage {
  // Inyección de dependencias para entornos standalone
  public environmentInjector = inject(EnvironmentInjector);
  
  // ==========================================
  // ESTADO (STATE)
  // ==========================================

  // Variable para controlar el estado del modo oscuro (Dark Mode)
  esModoOscuro = false;
  
  // Controla si el modal de búsqueda rápida o categorías está abierto
  isModalOpen = false;

  // Lista de categorías para el modal (si se usa desde aquí)
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

  // ==========================================
  // CONSTRUCTOR
  // ==========================================
  constructor(private router: Router) {
    // Registramos TODOS los iconos que se utilizan en la barra de navegación y menús
    addIcons({ homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline, searchOutline, closeOutline, checkmarkCircleOutline, paw, helpCircle, menu });
    
    // Detectamos la preferencia de color del sistema (claro u oscuro) al iniciar
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)');
    this.esModoOscuro = prefiereOscuro.matches;
    this.actualizarTema(); 

    // Escuchamos cambios en la preferencia del sistema mientras la app está abierta (si el usuario cambia el tema del móvil)
    prefiereOscuro.addEventListener('change', (mediaQuery) => {
      this.esModoOscuro = mediaQuery.matches;
      this.actualizarTema();
    });
  }

  // ==========================================
  // MÉTODOS PÚBLICOS (ACCIONES DE LA UI)
  // ==========================================

  /**
   * Abre o cierra el modal
   * @param isOpen Estado del modal
   */
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  /**
   * Navega a la página del buscador filtrando por la categoría seleccionada
   * @param categoria Categoría a buscar
   */
  seleccionarCategoria(categoria: string) {
    this.isModalOpen = false;
    // Navegar al buscador con la categoría seleccionada como parámetro en la URL
    this.router.navigate(['/tabs/buscador'], { queryParams: { category: categoria } });
  }

  /**
   * Alterna manualmente entre el tema claro y oscuro.
   * Se llama cuando el usuario pulsa el botón de sol/luna en la toolbar.
   */
  alternarTema() {
    this.esModoOscuro = !this.esModoOscuro;
    this.actualizarTema();
  }

  /**
   * Aplica la clase CSS correspondiente al body del documento HTML
   * para cambiar visualmente el tema de toda la aplicación.
   */
  private actualizarTema() {
    document.body.classList.toggle('dark', this.esModoOscuro);
    document.body.classList.toggle('light', !this.esModoOscuro);
  }
}
