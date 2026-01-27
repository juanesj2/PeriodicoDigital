import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewsCardComponent, NewsItem } from '../components/news-card/news-card.component';
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
  newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'New AI Chip Revealed',
      description: 'New AI Chip tweets the world views oneaqiptmats. His entering automation of target stage and Investment twilts...',
      image: 'https://cataas.com/cat?width=200&height=200&_r=1'
    },
    {
      id: 2,
      title: 'New AI Chip Comes to Position on Gits and atrita...',
      description: 'The Soomiciort and navmation backets marketing is hap imvantend unevand fea...',
      image: 'https://cataas.com/cat?width=200&height=200&_r=2'
    },
    {
      id: 3,
      title: 'Fumbottorra-O',
      description: "Branda's news reference: bunda inwareamerts and overonotts contents...",
      image: 'https://cataas.com/cat?width=200&height=200&_r=3'
    },
    {
      id: 4,
      title: 'Fandevvır states',
      description: "Branda's news reference: bunda inwareamerts and overonotts contents...",
      image: 'https://cataas.com/cat?width=200&height=200&_r=4'
    }
  ];

  constructor() {}
}