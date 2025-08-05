import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './main-home.html',
  styleUrl: './main-home.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MainHome implements OnInit {
  images = [
    'assets/imgs/imagem_2025-06-22_144010800-removebg-preview.png',
    'assets/imgs/imagem_2025-07-26_161954579-removebg-preview.png',
    'assets/imgs/imagem_2025-07-26_191245751-removebg-preview.png',

  ];
  currentImageIndex = Math.floor(Math.random() * 3);

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 25000); // troca a cada 5 segundos
  }
}
