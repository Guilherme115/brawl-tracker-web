import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../user-profile/user-profile';
import { LanguageService } from '../core/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, UserProfileComponent, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  isScrolled = false;
  showLanguageDropdown = false;
  isMobileMenuOpen = false;
  currentLang$: Observable<string>;
  isHomePage = true;

  // Variáveis para o header inteligente
  private lastScrollY = 0;
  isHeaderHidden = false;

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {
    this.currentLang$ = this.languageService.currentLang$;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.isHomePage = (event as NavigationEnd).urlAfterRedirects === '/';
      // Reseta o estado do header ao navegar para uma nova página
      this.isHeaderHidden = false;
      this.isScrolled = false; // Garante que o header grande apareça na home
      window.scrollTo(0, 0); // Rola para o topo da nova página
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;

    // 1. Controla a transição de GRANDE para PEQUENO
    this.isScrolled = currentScrollY > 10;

    // 2. LÓGICA REFINADA PARA ESCONDER/MOSTRAR
    // Só ativa a lógica de esconder DEPOIS que o header já encolheu (scroll > 175px)
    if (currentScrollY > 175) {
      if (currentScrollY > this.lastScrollY) {
        // Rolando para baixo -> Esconde
        this.isHeaderHidden = true;
      } else {
        // Rolando para cima -> Mostra
        this.isHeaderHidden = false;
      }
    } else {
      // Na área do header grande, ele nunca fica escondido
      this.isHeaderHidden = false;
    }

    // Atualiza a última posição do scroll
    this.lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
  }

  // O resto dos seus métodos continua igual...
  toggleLanguageDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.showLanguageDropdown = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click')
  clickout() {
    if (this.showLanguageDropdown) {
      this.showLanguageDropdown = false;
    }
  }
}
