import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './app/authentication/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
}).catch((err) =>
  console.error(err)
);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.minimize').forEach(function(button) {
    button.addEventListener('click', function() {
      document.body.classList.add('minimized');
    });
  });

  document.querySelectorAll('.maximize').forEach(function(button) {
    button.addEventListener('click', function() {
      document.body.classList.remove('minimized');
    });
  });
});
