import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonTabButton, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
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
    NewsCardComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
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

  /**
   * Carga un número limitado de noticias adicionales de gatos.
   * Simula la carga y luego desactiva el infinite scroll.
   * @param event Evento del infinite scroll
   */
  loadData(event: any) {
    // Simular retraso para ver al hámster
    setTimeout(() => {
      const nuevasNoticias: ItemNoticia[] = [
        {
          id: Date.now() + 1,
          title: 'MIAU: Nuevo rascador destruido',
          description: 'Miau miau he destrozado el rascador nuevo en 5 minutos miau. Karen llora miau.',
          content:'El rascador nuevo no duró ni 5 minutos. Miau miau, es que estaba muy blandito. La humana (Karen) está llorando en la esquina, pero yo estoy feliz afilándome las uñas en los restos. Miau.',
          image: `https://cataas.com/cat?width=200&height=200&_r=${Math.random()}`
        },
        {
          id: Date.now() + 2,
          title: 'Caza nocturna de calcetines MIAU',
          description: 'He cazado todos los calcetines y los he puesto bajo el sofá miau. Victoria miau.',
          content:'La misión de anoche fue un éxito rotundo. Todos los calcetines de la casa han sido capturados y asegurados bajo el sofá. La humana no podrá salir de casa hoy. Miau miau victoria.',
          image: `https://cataas.com/cat?width=200&height=200&_r=${Math.random()}`
        },
        {
          id: Date.now() + 3,
          title: 'MIAU: ¿Por qué la puerta está cerrada?',
          description: 'Miau miau ábreme la puerta. No quiero entrar, solo quiero que esté abierta miau.',
          content:'Es una ofensa a mi majestad que una puerta esté cerrada. He estado cantando la canción de mi pueblo durante 3 horas para que la abran. Cuando la abrieron, decidí quedarme fuera. Miau.',
          image: `https://cataas.com/cat?width=200&height=200&_r=${Math.random()}`
        }
      ];

      this.itemsNoticia.push(...nuevasNoticias);
      
      // Completar la carga
      event.target.complete();

      // Desactivar el infinite scroll para que no cargue más (simulando fin de datos)
      event.target.disabled = true;
    }, 2000);
  }
}