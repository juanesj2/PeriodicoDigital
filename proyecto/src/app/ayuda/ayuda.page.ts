import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonIcon, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { navigateOutline, newspaperOutline, heartOutline, searchOutline, moonOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonIcon, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle]
})
export class AyudaPage implements OnInit {

  // ==========================================
  // CONSTRUCTOR
  // ==========================================
  constructor() {
    // Registrar iconos específicos utilizados en la página de ayuda
    addIcons({ navigateOutline, newspaperOutline, heartOutline, searchOutline, moonOutline });
  }

  // ==========================================
  // CICLO DE VIDA (LIFECYCLE)
  // ==========================================

  ngOnInit() {
    // Lógica de inicialización si fuera necesaria (ej. cargar FAQs dinámicas)
  }

}
