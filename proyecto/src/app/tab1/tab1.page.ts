import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewsCardComponent, ItemNoticia } from '../components/news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { sunnyOutline, bookmarkOutline, newspaperOutline, moonOutline, homeOutline } from 'ionicons/icons';
import { NoticiasService } from '../services/noticias.service';
import { Articulo } from '../interfaces/noticias';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    NewsCardComponent
  ],
})
export class Tab1Page implements OnInit {
  // Array para almacenar las noticias que se mostrarán en la vista
  itemsNoticia: ItemNoticia[] = [];

}
