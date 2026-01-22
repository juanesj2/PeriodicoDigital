import { Component, Input } from '@angular/core';
import { IonList, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-list',
  template: `
    <ion-list [inset]="inset" [lines]="lines">
      <ion-list-header *ngIf="header">
        <ion-label>{{ header }}</ion-label>
      </ion-list-header>
      <ng-content></ng-content>
    </ion-list>
  `,
  imports: [IonList, IonListHeader, IonLabel, CommonModule],
  standalone: true
})
export class UiListComponent {
  @Input() inset: boolean = false;
  @Input() lines: 'full' | 'inset' | 'none' = 'none'; // Default to none for cleaner look usually
  @Input() header?: string;

  constructor() {}
}
