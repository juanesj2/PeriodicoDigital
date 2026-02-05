import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewsCardComponent, ItemNoticia } from '../components/news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../services/noticias.service';
import { Articulo } from '../interfaces/noticias';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],

  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    NewsCardComponent
  ],
})
export class Tab4Page implements OnInit {
  // Array para almacenar las noticias que se mostrarán en la vista
  itemsNoticia: ItemNoticia[] = [];
  
  // Categoría seleccionada por defecto
  selectedCategory: string = 'entertainment';

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.noticiasService.getTitularesPorCategoria(this.selectedCategory).subscribe(resp => {
      // Map Articulo to ItemNoticia
      this.itemsNoticia = resp.articles.map(articulo => ({
        id: articulo.id,
        title: articulo.title,
        description: articulo.description,
        image: articulo.image,
        source: articulo.source.name,
        url: articulo.url
      }));
    });
  }

}