import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  ModalController,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ItemNoticia } from '../news-card/news-card.component';

@Component({
  selector: 'app-news-modal',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
  ],
  templateUrl: './news-modal.component.html',
})

export class NewsModalComponent {
  @Input() noticia!: ItemNoticia;

  constructor(private modalCtrl: ModalController) {}
  cleanContent(text: string): string {
    return text?.replace(/\s*\[\d+\schars\]$/, '  ⬇   Seguir leyendo ⬇ ');
  }

  close() {
    this.modalCtrl.dismiss();
  }
  openExternal(url?: string) {
  if (!url) return;
  window.open(url, '_blank');
}
}