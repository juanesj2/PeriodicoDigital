import { Component, Input } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ui-button',
  template: `
    <ion-button
      [color]="color"
      [fill]="fill"
      [expand]="expand"
      [size]="size"
      [disabled]="disabled"
      [shape]="shape"
      [href]="href"
      [type]="type"
      (click)="onClick($event)">
      <ng-content></ng-content>
    </ion-button>
  `,
  imports: [IonButton],
  standalone: true
})
export class UiButtonComponent {
  @Input() color: string = 'primary';
  @Input() fill: 'clear' | 'outline' | 'solid' | 'default' = 'solid';
  @Input() expand: 'block' | 'full' = 'block';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() disabled: boolean = false;
  @Input() shape?: 'round';
  @Input() href?: string;
  @Input() type: 'button' | 'reset' | 'submit' = 'button';

  constructor() {}

  onClick(event: Event) {
    // Event bubbling handles the click, but we could add custom logic here
  }
}
