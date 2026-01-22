import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-card',
  template: `
    <ion-card [color]="color">
      <ion-card-header *ngIf="title || subtitle">
        <ion-card-title *ngIf="title">{{ title }}</ion-card-title>
        <ion-card-subtitle *ngIf="subtitle">{{ subtitle }}</ion-card-subtitle>
      </ion-card-header>
      
      <ion-card-content>
        <ng-content></ng-content>
      </ion-card-content>
    </ion-card>
  `,
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, CommonModule],
  standalone: true
})
export class UiCardComponent {
  @Input() color?: string;
  @Input() title?: string;
  @Input() subtitle?: string;

  constructor() {}
}
