import { Component, Input } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ui-content',
  template: `
    <ion-content [fullscreen]="fullscreen" [color]="color">
      <ng-content></ng-content>
    </ion-content>
  `,
  imports: [IonContent],
  standalone: true
})
export class UiContentComponent {
  @Input() fullscreen: boolean = false;
  @Input() color?: string = 'light'; // Defaulting to light for better aesthetics usually

  constructor() {}
}
