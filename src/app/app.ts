import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PopupService } from './core/popup.service';
import { LoginPopupComponent } from './login-popup/login-popup';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule, LoginPopupComponent],

  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query('.route-container', [
          style({ height: '{{currentHeight}}' })
        ], {
          optional: true,
          params: { currentHeight: 'auto' }
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            top: 0,
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.97)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: 0,
              transform: 'scale(1.03)'
            }),
            animate('400ms 100ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ]),
        query('.route-container', [
          animate('0ms', style({ height: 'auto' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class App implements AfterViewInit {
  @ViewChild('routeContainer') routeContainer!: ElementRef;

  // 1. Apenas declaramos a variável e seu tipo aqui.
  showLoginPopup$: Observable<boolean>;

  constructor(private router: Router, private popupService: PopupService) {
    // 2. Inicializamos a variável DENTRO do construtor, onde o popupService já existe.
    this.showLoginPopup$ = this.popupService.showLoginPopup$;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.adjustContainerHeight(), 100);
      }
    });
  }

  ngAfterViewInit() {
    this.adjustContainerHeight();
  }

  prepareRoute(outlet: RouterOutlet) {
    if (this.routeContainer) {
      const currentHeight = this.routeContainer.nativeElement.scrollHeight;
      return {
        value: outlet?.activatedRouteData?.['animation'] || '',
        params: { currentHeight: currentHeight + 'px' }
      };
    }
    return outlet?.activatedRouteData?.['animation'] || '';
  }

  private adjustContainerHeight() {
    if (this.routeContainer) {
      const container = this.routeContainer.nativeElement;
      const content = container.querySelector('router-outlet + *');
      if (content) {
        const contentHeight = content.scrollHeight;
        const minHeight = window.innerHeight - 140;
        container.style.minHeight = Math.max(contentHeight, minHeight) + 'px';
      }
    }
  }
}
