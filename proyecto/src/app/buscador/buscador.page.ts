import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent, IonSelect, IonSelectOption, IonItem, IonLabel, IonButton, IonIcon, IonModal, IonButtons, IonList } from '@ionic/angular/standalone';
import { NewsCardComponent, ItemNoticia } from '../components/news-card/news-card.component';
import { NoticiasService } from '../services/noticias.service';
import { addIcons } from 'ionicons';
import { searchOutline, closeOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    NewsCardComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonModal,
    IonButtons,
    IonList
  ]
})
export class BuscadorPage implements OnInit {

  // ==========================================
  // PROPIEDADES (VARIABLES)
  // ==========================================

  // Lista de categorías disponibles para filtrar noticias (API GNews)
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

  // Categoría seleccionada por defecto
  selectedCategory: string = 'general';

  // Array que almacenará las noticias obtenidas
  itemsNoticia: ItemNoticia[] = [];

  // Página actual para la paginación de la API
  page: number = 1;

  // Bandera para saber si se están cargando datos (útil para mostrar spinners o deshabilitar botones)
  loading: boolean = false;

  // Controla si el modal de selección de categorías está visible
  isModalOpen: boolean = false;

  // ==========================================
  // CONSTRUCTOR
  // ==========================================
  // Se inyectan los servicios necesarios: NoticiasService para datos y ActivatedRoute para leer parámetros de URL
  constructor(private noticiasService: NoticiasService, private route: ActivatedRoute) {
    // Registrar iconos que se usarán en el HTML
    addIcons({ searchOutline, closeOutline, checkmarkCircleOutline });
  }

  // ==========================================
  // CICLO DE VIDA (LIFECYCLE)
  // ==========================================

  // Se ejecuta al iniciar el componente
  ngOnInit() {
    // Suscribirse a los cambios en los parámetros de la URL (si venimos de otra página con una categoría preseleccionada)
    this.route.queryParams.subscribe(params => {
      // Si la URL trae un parámetro 'category', lo usamos y buscamos
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.buscarNoticias();
      } else {
        // Carga inicial por defecto si no hay parámetros
        this.buscarNoticias();
      }
    });
  }
  
  // ==========================================
  // MÉTODOS PÚBLICOS (ACCIONES DE LA UI)
  // ==========================================

  /**
   * Abre o cierra el modal de categorías
   * @param isOpen true para abrir, false para cerrar
   */
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  /**
   * Se ejecuta cuando el usuario selecciona una categoría en el modal
   * @param categoria La nueva categoría seleccionada
   */
  seleccionarCategoria(categoria: string) {
    this.selectedCategory = categoria;
    this.setOpen(false); // Cierra el modal
    this.buscarNoticias(); // Refresca las noticias con la nueva categoría
  }

  /**
   * Resetea la lista y la página, y carga noticias desde cero (Pull to refresh o cambio de filtro)
   */
  buscarNoticias() {
    this.page = 1; // Volver a la primera página
    this.itemsNoticia = []; // Limpiar lista actual
    this.loading = true; // Activar loading
    this.cargarDatos(); // Llamar a la API
  }

  /**
   * Método principal para obtener datos del servicio
   * @param event (Opcional) Evento del Infinite Scroll para saber cuándo completar la animación
   */
  cargarDatos(event?: any) {
    // Llamada al servicio pasando categoría y número de página
    this.noticiasService.getTitularesPorCategoria(this.selectedCategory, this.page).subscribe({
      next: (resp) => {
        // Si no hay más artículos, detenemos el infinite scroll
        if (resp.articles.length === 0) {
          if (event) event.target.disabled = true;
          this.loading = false;
          return;
        }

        // Mapeamos la respuesta de la API a nuestro modelo ItemNoticia
        const nuevosItems = resp.articles.map(articulo => ({
          id: articulo.id,
          title: articulo.title,
          description: articulo.description,
          content: articulo.content,
          image: articulo.image,
          source: articulo.source.name,
          url: articulo.url
        }));

        // Añadimos los nuevos items a la lista existente (spread operator)
        this.itemsNoticia.push(...nuevosItems);

        // Si fue llamado por infinite scroll, completamos el evento
        if (event) event.target.complete();
        this.loading = false;
      },
      error: (err) => {
        console.error(err); // Manejo básico de errores
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  /**
   * Se ejecuta al llegar al final de la lista (Infinite Scroll)
   */
  loadData(event: any) {
    this.page++; // Incrementamos página para pedir la siguiente tanda
    this.cargarDatos(event); // Cargamos más datos
  }
}
