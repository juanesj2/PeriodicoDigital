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
  paw, helpCircle, menu, colorPaletteOutline, ellipse, helpCircleOutline, partlySunnyOutline
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { firstValueFrom } from 'rxjs';

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
  providers: [ModalController],
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
  constructor(private router: Router, private http: HttpClient, private modalCtrl: ModalController) {
    // Registramos TODOS los iconos, incluyendo los nuevos para el menú de temas
    addIcons({ 
      homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, 
      videocamOutline, sunnyOutline, moonOutline, newspaperOutline, 
      bookmarkOutline, searchOutline, closeOutline, checkmarkCircleOutline, 
      paw, helpCircle, menu, colorPaletteOutline, ellipse, helpCircleOutline, partlySunnyOutline 
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

  mostrarClima: boolean = false;
  climaGuardado: any = null;

  //Abre el modal del clima. Se llama cuando se pulsa el botón del clima
  async abrirClima() {
    try {
      //Pedimos permisos (Casi me mato para conseguir hacer esto)
      try {
        const status = await Geolocation.checkPermissions();
        if (status.location !== 'granted') {
          const permiso = await Geolocation.requestPermissions();
          if (permiso.location !== 'granted') {
            alert('Danos permiso de ubicación para ver el clima');
            return;
          }
        }
      } catch (e) {
        // En Web las funciones de permisos pueden fallar o no estar implementadas,
        // las ignoramos porque getCurrentPosition pedirá el permiso directamente.
      }

      //Obtenemos la localización (He instalado el geolocation con el capacitor)
      const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      //Llamamos a la API del clima añadiendo timezone=auto para que la hora local coincida
      const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
      const respuestaClima: any = await firstValueFrom(this.http.get(urlClima));

      //Llamamos a una API de geocodificación inversa gratuita para obtener la ciudad
      let nombreCiudad = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
      try {
        const urlCiudad = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;
        const respuestaCiudad: any = await firstValueFrom(this.http.get(urlCiudad));
        if (respuestaCiudad.city || respuestaCiudad.locality) {
          nombreCiudad = `${respuestaCiudad.city || respuestaCiudad.locality}, ${respuestaCiudad.countryCode}`;
        }
      } catch (e) {
        console.warn('No se pudo obtener el nombre de la ciudad', e);
      }

      //Estos son los datos que aparecerán en el modal
      const code = respuestaClima.current_weather.weathercode;
      const isDay = respuestaClima.current_weather.is_day === 1;
      let descripcion = 'Desconocido';
      let icono = 'thermometer-outline';

      // Interpretación de códigos WMO
      if (code === 0) {
        descripcion = 'Despejado';
        icono = isDay ? '☀️' : '🌕';
      } else if (code === 1 || code === 2 || code === 3) {
        descripcion = 'Parcialmente Nublado';
        icono = isDay ? '⛅' : '☁️';
      } else if (code >= 45 && code <= 48) {
        descripcion = 'Niebla';
        icono = '🌫️';
      } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        descripcion = 'Lluvia';
        icono = '🌧️';
      } else if (code >= 71 && code <= 77) {
        descripcion = 'Nieve';
        icono = '❄️';
      } else if (code >= 95 && code <= 99) {
        descripcion = 'Tormenta';
        icono = '⛈️';
      }

      const ahora = new Date();
      const horaFormateada = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      this.climaGuardado = {
        location: nombreCiudad,
        temperature: respuestaClima.current_weather.temperature,
        windspeed: respuestaClima.current_weather.windspeed,
        winddirection: respuestaClima.current_weather.winddirection,
        is_day: respuestaClima.current_weather.is_day,
        weathercode: respuestaClima.current_weather.weathercode,
        timezone: respuestaClima.timezone,
        time: horaFormateada,
        descripcion: descripcion,
        icono: icono
      };

      this.mostrarClima = true;

    } catch (error) {
      console.error('Error obteniendo clima:', error);
      alert('No se pudo obtener el clima. Activa la ubicación.');
    }
  }

  cerrarClima() {
    this.mostrarClima = false;
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