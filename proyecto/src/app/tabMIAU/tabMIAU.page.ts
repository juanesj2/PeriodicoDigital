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
      title: 'MIAU MIAU: La caja perfecta existe',
      description: 'Miau miau he encontrado, miau, la caja de cartón definitiva. Prrr prrr es muy cómoda miau.',
      image: 'https://cataas.com/cat?width=200&height=200&_r=1'
    },
    {
      id: 2,
      title: 'El punto rojo: ¿Amigo o Enemigo? MIAU',
      description: 'Miau miau el punto rojo corre mucho miau. No puedo atraparlo miau miau. Karen se ríe miau.',
      image: 'https://cataas.com/cat?width=200&height=200&_r=2'
    },
    {
      id: 3,
      title: 'MIAU: Exigimos más atún ahora',
      description: 'Miau miau miau la lata está vacía. Miau Karen, dame atún o te muerdo miau.',
      image: 'https://cataas.com/cat?width=200&height=200&_r=3'
    },
    {
      id: 4,
      title: 'Prrr Prrr: Siesta de 18 horas',
      description: 'Miau zzz miau. Dormir al sol es lo mejor miau. No molestar miau.',
      image: 'https://cataas.com/cat?width=200&height=200&_r=4'
    },
    {
      id: 5,
      title: 'MIAU: He tirado el vaso de agua',
      description: 'Miau miau estaba en el borde miau. Lo empujé y se cayó miau oops. Prrr.',
      image: 'https://cataas.com/cat?width=200&height=200&_r=5'
    },
    {
      id: 6,
      title: 'Invasión de palomas en la ventana MIAU',
      description: 'Miau miau miau kekekeke. Las veo miau. Quiero cazarlas miau pero hay cristal miau.',
      image: 'https://cataas.com/cat?width=200&height=200&_r=6'
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
          image: `https://cataas.com/cat?width=200&height=200&_r=${Math.random()}`
        },
        {
          id: Date.now() + 2,
          title: 'Caza nocturna de calcetines MIAU',
          description: 'He cazado todos los calcetines y los he puesto bajo el sofá miau. Victoria miau.',
          image: `https://cataas.com/cat?width=200&height=200&_r=${Math.random()}`
        },
        {
          id: Date.now() + 3,
          title: 'MIAU: ¿Por qué la puerta está cerrada?',
          description: 'Miau miau ábreme la puerta. No quiero entrar, solo quiero que esté abierta miau.',
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