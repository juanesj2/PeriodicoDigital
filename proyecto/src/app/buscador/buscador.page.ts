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

  selectedCategory: string = 'general';
  itemsNoticia: ItemNoticia[] = [];
  page: number = 1;
  loading: boolean = false;
  isModalOpen: boolean = false;

  constructor(private noticiasService: NoticiasService, private route: ActivatedRoute) {
    addIcons({ searchOutline, closeOutline, checkmarkCircleOutline });
  }

  ngOnInit() {
    // Suscribirse a los cambios en los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.buscarNoticias();
      } else {
        // Carga inicial si no hay parámetros (o la primera vez)
        this.buscarNoticias();
      }
    });
  }
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  seleccionarCategoria(categoria: string) {
    this.selectedCategory = categoria;
    this.setOpen(false);
    this.buscarNoticias();
  }

  buscarNoticias() {
    this.page = 1;
    this.itemsNoticia = [];
    this.loading = true;
    this.cargarDatos();
  }

  cargarDatos(event?: any) {
    this.noticiasService.getTitularesPorCategoria(this.selectedCategory, this.page).subscribe({
      next: (resp) => {
        if (resp.articles.length === 0) {
          if (event) event.target.disabled = true;
          this.loading = false;
          return;
        }

        const nuevosItems = resp.articles.map(articulo => ({
          id: articulo.id,
          title: articulo.title,
          description: articulo.description,
          image: articulo.image,
          source: articulo.source.name,
          url: articulo.url
        }));

        this.itemsNoticia.push(...nuevosItems);

        if (event) event.target.complete();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  loadData(event: any) {
    this.page++;
    this.cargarDatos(event);
  }
}
