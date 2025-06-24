import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    RouterLink,
    UserProfileComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  animations: [
    trigger('iconAnimation', [
      state('initial', style({
        transform: 'scale(1)'
      })),
      state('clicked', style({
        transform: 'scale(1.2)'
      })),
      transition('initial <=> clicked', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class Header {
  iconState = 'initial';

  toggleIcon() {
    this.iconState = this.iconState === 'initial' ? 'clicked' : 'initial';
  }
}
