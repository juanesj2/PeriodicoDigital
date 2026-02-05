import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewsCardComponent, ItemNoticia } from '../components/news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { sunnyOutline, bookmarkOutline, newspaperOutline, moonOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab-miau',
  templateUrl: 'tabMIAU.page.html',
  styleUrls: ['tabMIAU.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    NewsCardComponent
  ],
})
export class TabMIAUPage {
  // Lista de noticias de gatos para mostrar en la vista
  itemsNoticia: ItemNoticia[] = [
    {
      id: 1,
      title: 'Nuevo Chip de IA Revelado',
      description: 'Un nuevo chip de IA sorprende al mundo con sus capacidades de automatización y visión...',
      content: 'Niño ponme otra que esta tiene agujero',
      image: 'https://cataas.com/cat?width=200&height=200&_r=1'
    },
    {
      id: 2,
      title: 'La IA llega a los gatos',
      description: 'El mercado de juguetes inteligentes para gatos está en auge con nuevas innovaciones...',
      content: 'Perdona tienes marlboro?',
      image: 'https://cataas.com/cat?width=200&height=200&_r=2'
    },
    {
      id: 3,
      title: 'Noticia Gatuna 3',
      description: 'Más noticias sobre el mundo felino y sus avances tecnológicos...',
      content: 'Con los dedos de las manos, los dedos de los pies...',
      image: 'https://cataas.com/cat?width=200&height=200&_r=3'
    },
    {
      id: 4,
      title: 'Gatos y Tecnología',
      description: 'Cómo la tecnología está mejorando la vida de nuestras mascotas...',
      content: 'Detenido Juan Steven en un club de carretera de Torrelodones ',
      image: 'https://cataas.com/cat?width=200&height=200&_r=4'
    }
  ];

  constructor() {}
}