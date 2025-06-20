import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import {MainHome} from './main-home/main-home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MainHome],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'brawl-tracker-web';
}
