import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  // Componentes standalone necesarios para la estructura base de la app
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  // ==========================================
  // CONSTRUCTOR
  // ==========================================
  constructor() {
    // Aquí se podrían inicializar servicios globales o comprobar estado de autenticación
  }
}
