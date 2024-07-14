import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-toggle-dark-theme',
  standalone: true,
  imports: [],
  templateUrl: './toggle-dark-theme.component.html',
  styleUrl: './toggle-dark-theme.component.css'
})
export class ToggleDarkThemeComponent {

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const toggle = document.getElementById('toggle') as HTMLInputElement;
      const currentTheme = localStorage.getItem('theme') || 'light-theme';
      this.renderer.addClass(document.body, currentTheme);

      toggle.checked = currentTheme === 'dark-theme';

      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          this.renderer.removeClass(document.body, 'light-theme');
          this.renderer.addClass(document.body, 'dark-theme');
          localStorage.setItem('theme', 'dark-theme');
        } else {
          this.renderer.removeClass(document.body, 'dark-theme');
          this.renderer.addClass(document.body, 'light-theme');
          localStorage.setItem('theme', 'light-theme');
        }
      });
    }
  }
  
}
