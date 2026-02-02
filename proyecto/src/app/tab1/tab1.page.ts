import { Component, OnInit } from '@angular/core';
import { IonHeader, 
  IonToolbar, 
  IonTitle,
  IonContent,   
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail, } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewsCardComponent, ItemNoticia } from '../components/news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { sunnyOutline, bookmarkOutline, newspaperOutline, moonOutline, homeOutline } from 'ionicons/icons';
import { NoticiasService } from '../services/noticias.service';
import { Articulo } from '../interfaces/noticias';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonItem,
      IonLabel,
      IonList,
      IonThumbnail,
      NewsCardComponent, CommonModule], // Importamos NewsCardComponent y CommonModule
})
export class Tab1Page implements OnInit {
  // Array para almacenar las noticias que se mostrarán en la vista
  itemsNoticia: ItemNoticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    // Cargamos los titulares al iniciar la página
    this.cargarNoticias();
  }

  /**
   * Llama al servicio de noticias para obtener los titulares
   * y mapea los datos al formato que necesita el componente de tarjeta.
   */
  cargarNoticias() {
    // Llamamos al método filtrando por la categoría 'technology' (Tecnología)
    this.noticiasService.getTitularesPorCategoria('technology').subscribe({
      next: (resp) => {
        // Mapeamos los artículos de la respuesta a la estructura de NewsItem
        this.itemsNoticia = resp.articles.map(articulo => ({
          id: articulo.id,
          title: articulo.title,
          description: articulo.description,
          image: articulo.image,
          source: articulo.source.name,
          url: articulo.url
        }));
      },
      error: (err) => {
        console.error('Error al cargar noticias', err);
      }
    });
  }
}
