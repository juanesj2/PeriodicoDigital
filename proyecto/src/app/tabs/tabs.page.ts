import { Component, EnvironmentInjector, inject } from '@angular/core';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonTitle, 
  IonModal, 
  IonContent, 
  IonList, 
  IonListHeader,
  IonMenu, 
  IonMenuButton, 
  IonMenuToggle, 
  IonAccordion, 
  IonAccordionGroup, 
  IonItem} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, 
  videocamOutline, sunnyOutline, moonOutline, newspaperOutline, 
  bookmarkOutline, searchOutline, closeOutline, checkmarkCircleOutline, 
  paw, helpCircle, menu, colorPaletteOutline, ellipse, helpCircleOutline 
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, 
    IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, RouterLink, 
    IonModal, IonContent, IonList, IonListHeader, IonItem, IonMenu, IonMenuButton, 
    IonMenuToggle, IonAccordion, IonAccordionGroup
  ],
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

  // Lista de categorías para el modal
  categorias: string[] = [
    'general', 'world', 'nation', 'business', 'technology', 
    'entertainment', 'sports', 'science', 'health'
  ];

  // ==========================================
  // CONSTRUCTOR
  // ==========================================
  constructor(private router: Router) {
    // Registramos TODOS los iconos, incluyendo los nuevos para el menú de temas
    addIcons({ 
      homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, 
      videocamOutline, sunnyOutline, moonOutline, newspaperOutline, 
      bookmarkOutline, searchOutline, closeOutline, checkmarkCircleOutline, 
      paw, helpCircle, menu, colorPaletteOutline, ellipse, helpCircleOutline 
    });
    
    // Inicialización de preferencias guardadas o sistema
    this.inicializarPreferencias();
  }

  /**
   * Carga las preferencias guardadas en el dispositivo o detecta las del sistema.
   */
  private inicializarPreferencias() {
    // 1. Cargar Modo Oscuro
    const modoGuardado = localStorage.getItem('dark-mode');
    if (modoGuardado !== null) {
      this.esModoOscuro = modoGuardado === 'true';
    } else {
      const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)');
      this.esModoOscuro = prefiereOscuro.matches;
      
      // Escuchar cambios del sistema en tiempo real
      prefiereOscuro.addEventListener('change', (e) => {
        if (localStorage.getItem('dark-mode') === null) {
          this.esModoOscuro = e.matches;
          this.actualizarTema();
        }
      });
    }

    // 2. Cargar Tema de Color
    const temaColorGuardado = localStorage.getItem('color-theme') || 'theme-blue';
    
    this.actualizarTema();
    this.cambiarColorTema(temaColorGuardado);
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
    this.router.navigate(['/tabs/buscador'], { queryParams: { category: categoria } });
  }

  /**
   * Alterna manualmente entre el tema claro y oscuro.
   */
  alternarTema() {
    this.esModoOscuro = !this.esModoOscuro;
    localStorage.setItem('dark-mode', this.esModoOscuro.toString());
    this.actualizarTema();
  }

  /**
   * Aplica la clase CSS correspondiente al body del documento HTML
   */
  private actualizarTema() {
    document.body.classList.toggle('dark', this.esModoOscuro);
    document.body.classList.toggle('light', !this.esModoOscuro);
  }

  /**
   * Cambia la paleta de colores primarios de la aplicación
   * @param nombreTema Clase del tema (theme-red, theme-purple, etc.)
   */
  cambiarColorTema(nombreTema: string) {
    const temas = ['theme-blue', 'theme-red', 'theme-green', 'theme-purple'];
    
    // Eliminar cualquier tema previo del body
    temas.forEach(t => document.body.classList.remove(t));
    
    // Añadir el nuevo tema seleccionado
    document.body.classList.add(nombreTema);
    
    // Guardar en Storage para que persista al recargar
    localStorage.setItem('color-theme', nombreTema);
  }
}