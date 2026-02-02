import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RespuestaNoticias } from '../interfaces/noticias';
import { environment } from 'src/environments/environment';

// Datos de prueba para fallback
const DATOS_PRUEBA: RespuestaNoticias = {
    "totalArticles": 78230,
    "articles": [
        {
            "id": "88227426cd80c10ca139b1e2e24b52fe",
            "title": "Google TV Quietly Got Better: New Shortcuts, Fixes, and Smarter Profiles",
            "description": "Google TV is getting a fresh update that adds new settings menu, homescreen improvements and a report history section.",
            "content": "Google is rolling out a fresh update to its TV platform that brings new settings and a few homescreen improvements...",
            "url": "https://www.androidheadlines.com/2026/01/google-tv-quietly-got-better-new-shortcuts-fixes-and-smarter-profiles.html",
            "image": "https://www.androidheadlines.com/wp-content/uploads/2023/09/AH-Google-TV-logo-2023-image-1-jpg.webp",
            "publishedAt": "2026-01-27T12:28:34Z",
            "lang": "en",
            "source": {
                "id": "0cecf842c67e3d7cc093daca6d9bdf9c",
                "name": "Android Headlines",
                "url": "https://www.androidheadlines.com",
                "country": "us"
            }
        },
        {
            "id": "6224ece19bd231558cfa6e2f2e5c2ccd",
            "title": "Google keeps pushing the Fitbit account migration deadline",
            "description": "Fitbit users get more time to migrate",
            "content": "Google completed its Fitbit acquisition in 2021. Less than a year later, in 2022, the company announced that starting in 2023, users would need a Google account to activate new Fitbit devices. It also gave existing users until early 2025 to migrate f... [1916 chars]",
            "url": "https://www.androidpolice.com/google-keeps-pushing-fitbit-account-migration-deadline/",
            "image": "https://static0.anpoimages.com/wordpress/wp-content/uploads/wm/2025/11/pixel-watch-4-fitbit-app.JPG?w=1600&h=900&fit=crop",
            "publishedAt": "2026-02-02T06:06:34Z",
            "lang": "en",
            "source": {
                "id": "3855a489b685d9599a636250ed950d3c",
                "name": "Android Police",
                "url": "https://www.androidpolice.com",
                "country": "us"
            }
        },
        {
            "id": "521d6ae76bfd926efad9fa941df7ef02",
            "title": "UFC 325 and Shakur Stevenson Beat WWE Royal Rumble in Google Trends",
            "description": "UFC 325 and Shakur Stevenson overshadowed WWE Royal Rumble among fans online despite unfolding on the same night.",
            "content": "Last Saturday, the combat sports world was abuzz with two major events: UFC 325 and the highly anticipated Ring VI card. But there was another combat sports event unfolding—WWE Royal Rumble. Yet excitement among fans appears to have been focused on U... [3214 chars]",
            "url": "https://www.essentiallysports.com/ufc-mma-boxing-news-ufc-325-and-shakur-stevenson-beat-wwe-royal-rumble-in-google-trends/",
            "image": "https://image-cdn.essentiallysports.com/wp-content/uploads/Alexander-Volkanovski-Shakur-Stevenson.jpg",
            "publishedAt": "2026-02-02T05:14:23Z",
            "lang": "en",
            "source": {
                "id": "f6c2179332ca0ae400ff2a52227265f3",
                "name": "Essentially Sports",
                "url": "https://www.essentiallysports.com",
                "country": "us"
            }
        },
        {
            "id": "5de1900128b64dd0850da6b907a787e4",
            "title": "Pixel 10 and Pixel Watch 4 discounts",
            "description": "After the inaugural 2026 deal, the US Google Store has brought back the same discounts on the Pixel 10 series and Pixel Watch 4.",
            "content": "After the inaugural 2026 deals, the US Google Store has brought back the same discounts on the Pixel 10 series and Pixel Watch 4.\nAhead of its replacement, the Pixel 9a is still $100 off (Amazon). The Pixel 10 is back to $649 after a $150 discount (A... [586 chars]",
            "url": "https://9to5google.com/2026/02/01/google-store-february-2026-pixel/",
            "image": "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/11/Pixel-10-Pro-XL-in-sunlight.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
            "publishedAt": "2026-02-01T18:46:14Z",
            "lang": "en",
            "source": {
                "id": "151292b021d31d91d452f04b0b225727",
                "name": "9to5Google",
                "url": "https://9to5google.com",
                "country": "us"
            }
        }
    ]
};

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  // API Key de GNews 
  private apiKey = 'bb53ea121e4e43caa8502d31d52ac87f'; 
  private apiUrl = 'https://gnews.io/api/v4';

  // Categorías disponibles
  public categorias: string[] = [
    'technology',
    'sports',
    'business',
    'entertainment',
    'general',
    'science',
    'health'
  ];

  constructor(private http: HttpClient) { }

  // ==============================================================
  // Métodos Principales del Servicio
  // ==============================================================

  /**
   * Obtiene los titulares principales (general).
   * Llama internamente a getTitularesPorCategoria con 'general'.
   */
  getTitulares(): Observable<RespuestaNoticias> {
    return this.getTitularesPorCategoria('general');
  }

  // ==============================================================

  /**
   * Obtiene titulares por categoría.
   * Categorías disponibles: technology, sports, business, entertainment, etc.
   * @param categoria Categoría a buscar.
   */
  getTitularesPorCategoria(categoria: string): Observable<RespuestaNoticias> {
    console.log(`Solicitando noticias de la categoría: ${categoria}`);
    
    // Si no hay API Key configurada, devolver datos de prueba (opcional)
    if (this.apiKey === 'YOUR_API_KEY_HERE') {
        console.warn('API Key no configurada. Usando datos de prueba.');
        return of(DATOS_PRUEBA);
    }

    // Petición HTTP a GNews
    // Se usa 'lang=es' para noticias en español.
    return this.http.get<RespuestaNoticias>(`${this.apiUrl}/top-headlines?category=${categoria}&apikey=${this.apiKey}&lang=es`);
  }
}
