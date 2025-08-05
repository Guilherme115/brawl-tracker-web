import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config'; // 1. Importe a sua configuração completa

// 2. Troque a configuração antiga pela sua appConfig importada
bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
