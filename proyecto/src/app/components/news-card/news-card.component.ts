import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, ModalController } from '@ionic/angular/standalone';
import { NewsModalComponent } from '../news-modal/news-modal.component';

export interface ItemNoticia {
  id: string | number;
  title: string;
  description: string;
  content: string;
  image: string;
  source?: string;
  url?: string;
}

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem],
})
export class NewsCardComponent {
  @Input() noticia!: ItemNoticia;

  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NewsModalComponent,
      componentProps: {
        noticia: this.noticia,
      },
    });

    await modal.present();
  }
}
