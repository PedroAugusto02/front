import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './authentication/auth.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
