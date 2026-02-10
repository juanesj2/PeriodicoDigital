import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewsCardComponent, ItemNoticia } from '../components/news-card/news-card.component';
import { NewsModalComponent } from '../components/news-modal/news-modal.component';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../services/noticias.service';
import { Articulo } from '../interfaces/noticias';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    NewsCardComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ],
})
export class Tab1Page implements OnInit {
  // Array para almacenar las noticias que se mostrarán en la vista
  itemsNoticia: ItemNoticia[] = [];
  
  // Categoría seleccionada por defecto
  selectedCategory: string = 'technology';
  
  // Página actual de la paginación de noticias (empieza en 1)
  page: number = 1;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  /**
   * Carga las noticias de la categoría seleccionada.
   * @param event (Opcional) El evento del infinite scroll para completar la carga o deshabilitarlo si no hay más datos.
   */
  cargarNoticias(event?: any) {
    this.noticiasService.getTitularesPorCategoria(this.selectedCategory, this.page).subscribe({
        next: (resp) => {
        
        // Si la respuesta no trae artículos, significa que hemos llegado al final.
        if (resp.articles.length === 0) {
            // Deshabilitar el infinite scroll para que no siga pidiendo más páginas.
            if (event) {
            event.target.disabled = true;
            }
            return;
        }

        // Mapeamos los artículos recibidos de la API a la estructura que necesita nuestro componente (ItemNoticia)
        const nuevosItems = resp.articles.map(articulo => ({
            id: articulo.id,
            title: articulo.title,
            description: articulo.description,
            content: articulo.content,
            image: articulo.image,
            source: articulo.source.name,
            url: articulo.url
        }));

        // Añadimos los nuevos artículos al final del array existente (acumulamos las noticias)
        this.itemsNoticia.push(...nuevosItems);

        // Si la carga fue disparada por el infinite scroll, completamos el evento para ocultar el spinner
        if (event) {
            event.target.complete();
        }
        },
        error: (err) => {
            console.error('Error al cargar noticias', err);
            // Aseguramos que el spinner se oculte incluso si hay error
            if (event) {
                event.target.complete();
            }
        }
    });
  }

  /**
   * Método que se ejecuta cuando el usuario llega al final de la lista (Infinite Scroll).
   * Aumenta el número de página y carga el siguiente bloque de noticias.
   * @param event Evento del infinite scroll
   */
  loadData(event: any) {
    this.page++;
    this.cargarNoticias(event);
  }

}