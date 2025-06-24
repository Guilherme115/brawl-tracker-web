import { Routes } from '@angular/router';

import { MainHome } from './main-home/main-home';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { PlansPrice } from './plans-price/plans-price';
import { Commands } from './commands/commands';
import { ContactUs } from './contact-us/contact-us';
import { Loginsucess } from './loginsucess/loginsucess';

export const routes: Routes = [
  {
    path: '',
    component: MainHome,
    data: { animation: 'HomePage' }
  },
  {
    path: 'header',
    component: Header,
    data: { animation: 'HeaderPage' }
  },
  {
    path: 'login-success',
    component: Loginsucess,
    data: { animation: 'LoginPage' }
  },
  {
    path: 'footer',
    component: Footer,
    data: { animation: 'FooterPage' }
  },
  {
    path: 'plans',
    component: PlansPrice,
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
  }
];
