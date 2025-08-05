import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // BehaviorSubject para que outros componentes possam saber o idioma atual
  public currentLang$ = new BehaviorSubject<string>('pt');

  constructor(private translate: TranslateService) {
    this.init();
  }

  private init() {
    // Define os idiomas disponíveis
    this.translate.addLangs(['en', 'pt']);

    // Tenta pegar o idioma salvo no localStorage
    const savedLang = localStorage.getItem('language') || 'pt';

    // Usa o idioma salvo ou o padrão
    this.translate.setDefaultLang(savedLang);
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    if (this.translate.getLangs().includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem('language', lang);
      this.currentLang$.next(lang); // Notifica os ouvintes sobre a mudança
      console.log(`Idioma alterado para: ${lang}`);
    }
  }
}
