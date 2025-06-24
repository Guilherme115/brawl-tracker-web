import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
  keyframes
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  animations: [
    trigger('routeAnimations', [
      // Animação padrão rápida
      transition('* <=> *', [
        query(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(20px)'
          })
        ], { optional: true }),

        query(':leave', [
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('150ms ease-out', style({
              opacity: 0,
              transform: 'translateY(-20px)'
            }))
          ], { optional: true }),

          query(':enter', [
            animate('200ms 100ms ease-out', style({
              opacity: 1,
              transform: 'translateY(0)'
            }))
          ], { optional: true })
        ])
      ]),

      // 🏠 ANIMAÇÃO ESPECIAL DO HOME - "Welcome Home Effect"
      transition('* => HomePage', [
        query(':enter', [
          style({
            opacity: 0,
            transform: 'scale(0.3) rotate(-5deg)',
            transformOrigin: 'center center'
          })
        ], { optional: true }),

        query(':leave', [
          animate('200ms ease-in', style({
            opacity: 0,
            transform: 'scale(0.95) rotate(2deg)',
            filter: 'blur(2px)'
          }))
        ], { optional: true }),

        query(':enter', [
          animate('500ms 150ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            keyframes([
              style({
                opacity: 0,
                transform: 'scale(0.3) rotate(-5deg)',
                filter: 'brightness(1.5) blur(3px)',
                offset: 0
              }),
              style({
                opacity: 0.7,
                transform: 'scale(1.1) rotate(1deg)',
                filter: 'brightness(1.2) blur(1px)',
                offset: 0.6
              }),
              style({
                opacity: 0.9,
                transform: 'scale(0.98) rotate(-0.5deg)',
                filter: 'brightness(1.05) blur(0.5px)',
                offset: 0.8
              }),
              style({
                opacity: 1,
                transform: 'scale(1) rotate(0deg)',
                filter: 'brightness(1) blur(0px)',
                offset: 1
              })
            ])
          )
        ], { optional: true })
      ]),

      // Slide lateral rápido saindo da HomePage
      transition('HomePage => *', [
        query(':enter', [
          style({
            opacity: 0,
            transform: 'translateX(30px)'
          })
        ], { optional: true }),

        query(':leave', [
          animate('120ms ease-in', style({
            opacity: 0,
            transform: 'translateX(-30px)'
          }))
        ], { optional: true }),

        query(':enter', [
          animate('180ms 80ms ease-out', style({
            opacity: 1,
            transform: 'translateX(0)'
          }))
        ], { optional: true })
      ])
    ])
  ]
})
export class App {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }
}
