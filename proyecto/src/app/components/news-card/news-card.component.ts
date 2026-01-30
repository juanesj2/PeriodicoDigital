import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem } from '@ionic/angular/standalone';

// Definimos la estructura de un ítem de noticia para la tarjeta
export interface NewsItem {
  id: string | number; // El ID puede ser número o string (hash)
  title: string;
  description: string;
  image: string;
  source?: string; // Nombre de la fuente (opcional)
  url?: string; // URL para abrir la noticia completa (opcional)
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
