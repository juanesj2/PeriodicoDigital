import { Component, Input } from '@angular/core';
import { IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-item',
  template: `
    <ion-item [button]="button" [detail]="detail" [lines]="lines" [disabled]="disabled" (click)="button ? null : undefined">
      <ng-content slot="start" select="[slot=start]"></ng-content>
      
      <ion-label *ngIf="label">
        <h2>{{ label }}</h2>
        <p *ngIf="detailText">{{ detailText }}</p>
      </ion-label>

      <ng-content></ng-content> <!-- Allow generic content projection for inputs etc -->

      <ion-note slot="end" *ngIf="note">{{ note }}</ion-note>
      <ng-content slot="end" select="[slot=end]"></ng-content>
    </ion-item>
  `,
  imports: [IonItem, IonLabel, IonNote, CommonModule],
  standalone: true
})
export class UiItemComponent {
  @Input() label?: string;
  @Input() detailText?: string; // Secondary text
  @Input() note?: string;
  @Input() button: boolean = false;
  @Input() detail: boolean = false;
  @Input() lines?: 'full' | 'inset' | 'none';
  @Input() disabled: boolean = false;

  constructor() {}
}
