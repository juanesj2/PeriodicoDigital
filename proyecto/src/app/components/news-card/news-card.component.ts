import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem } from '@ionic/angular/standalone';

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  source?: string;
}

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem]
})
export class NewsCardComponent {
  @Input() news!: NewsItem;
}
