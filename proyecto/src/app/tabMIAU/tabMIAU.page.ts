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
}