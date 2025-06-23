import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import {MainHome} from './main-home/main-home';
import {Footer} from './footer/footer';
import {PlansPrice} from './plans-price/plans-price';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MainHome, Footer, PlansPrice],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'brawl-tracker-web';
}
