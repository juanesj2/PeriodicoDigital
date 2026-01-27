import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-ui-icon',
  template: `
    <ion-icon [name]="name" [color]="color" [size]="size" [slot]="slot"></ion-icon>
  `,
  imports: [IonIcon],
  standalone: true
})
export class UiIconComponent {
  @Input() name!: string;
  @Input() color?: string;
  @Input() size?: 'small' | 'large';
  @Input() slot?: 'start' | 'end' | 'icon-only';

  constructor() {
    // Register all icons to ensure dynamic names work if needed, 
    // or rely on user registering them in main. 
    // For a wrapper, it's safer to rely on the app to register icons or register specific ones here if we knew them.
    // However, importing * from icons is heavy. 
    // Best practice: The usage site usually registers icons or we can try to find a way to lazy load.
    // simpler approach: Assuming icons are registered elsewhere or passed as strings that work.
  }
}
