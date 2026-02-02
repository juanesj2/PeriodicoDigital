import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, RouterLink],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  isDarkMode = false;

  constructor() {
    addIcons({ homeOutline, hardwareChipOutline, footballOutline, briefcaseOutline, videocamOutline, sunnyOutline, moonOutline, newspaperOutline, bookmarkOutline });
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    this.updateTheme(); 

    prefersDark.addEventListener('change', (mediaQuery) => {
      this.isDarkMode = mediaQuery.matches;
      this.updateTheme();
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('light', !this.isDarkMode);
  }
}
