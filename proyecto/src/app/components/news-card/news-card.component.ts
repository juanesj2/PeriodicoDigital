import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, ModalController, IonIcon, IonButton } from '@ionic/angular/standalone';
import { NewsModalComponent } from '../news-modal/news-modal.component';
import { NoticiasService } from '../../services/noticias.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

// ==========================================
// INTERFACES (MODELO DE DATOS)
// ==========================================
// Definición de la estructura de una noticia para toda la app
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
  imports: [CommonModule, IonItem, IonIcon, IonButton],
})
export class NewsCardComponent {

  // ==========================================
  // PROPIEDADES DE ENTRADA (INPUTS)
  // ==========================================
  // Recibe un objeto noticia desde el componente padre
  @Input() noticia!: ItemNoticia;

  // ==========================================
  // CONSTRUCTOR
  // ==========================================
  constructor(
    private modalCtrl: ModalController, // Para abrir modales
    public noticiasService: NoticiasService // Para gestionar favoritos
  ) {
    // Registrar iconos necesarios para este componente
    addIcons({ heart, heartOutline });
  }

  // ==========================================
  // MÉTODOS DE LA INTERFAZ
  // ==========================================

  /**
   * Abre un modal con el detalle completo de la noticia
   */
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NewsModalComponent,
      componentProps: {
        noticia: this.noticia, // Pasamos la noticia actual al modal
      },
    });

    await modal.present();
  }

  /**
   * Gestiona el clic en el botón de favorito
   * @param event Evento del clic (necesario para evitar que se abra la noticia al pinchar el corazón)
   */
  toggleFavorite(event: Event) {
    event.stopPropagation(); // Evitar propagación del clic al padre (item)
    this.noticiasService.toggleFavorito(String(this.noticia.id));
  }

  /**
   * Verifica si la noticia actual es favorita para mostrar el icono relleno o vacío
   */
  isFavorite(): boolean {
    return this.noticiasService.esFavorito(String(this.noticia.id));
  }
}
