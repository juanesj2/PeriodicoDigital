import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-header',
  template: `
    <ion-header [translucent]="translucent">
      <ion-toolbar [color]="color">
        <ion-buttons slot="start">
          <ng-content select="[slot=start]"></ng-content>
          <ion-back-button *ngIf="showBackButton" [defaultHref]="backButtonDefaultHref"></ion-back-button>
        </ion-buttons>

        <ion-title>{{ title }}</ion-title>

        <ion-buttons slot="end">
          <ng-content select="[slot=end]"></ng-content>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, CommonModule],
  standalone: true
})
export class UiHeaderComponent {
  @Input() title: string = '';
  @Input() translucent: boolean = false;
  @Input() color?: string;
  @Input() showBackButton: boolean = false;
  @Input() backButtonDefaultHref: string = '/';

  constructor() {}
}
