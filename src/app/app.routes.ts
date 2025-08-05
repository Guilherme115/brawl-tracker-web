import { Routes } from '@angular/router';

// Seus componentes de PÁGINA
import { MainHome } from './main-home/main-home';
import { PlansPrice } from './plans-price/plans-price';
import { Commands } from './commands/commands';
import { ContactUs } from './contact-us/contact-us';
import { Loginsucess } from './loginsucess/loginsucess';
import { AnalysisPage } from './analysis-page/analysis-page';

// Importe o novo guarda
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainHome,
    data: { animation: 'HomePage' }
  },
  {
    path: 'login-success',
    component: Loginsucess,
    data: { animation: 'LoginPage' }
  },
  {
    path: 'plans',
    component: PlansPrice,
    data: { animation: 'PlansPage' }
  },
  {
    path: 'analysis',
    component: AnalysisPage,
    // APLIQUE O GUARDA AQUI
    canActivate: [authGuard],
    data: { animation: 'PlansPage' }
  },
  {
    path: 'commands',
    component: Commands,
    data: { animation: 'CommandsPage' }
  },
  {
    path: 'contact',
    component: ContactUs,
    data: { animation: 'ContactPage' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
