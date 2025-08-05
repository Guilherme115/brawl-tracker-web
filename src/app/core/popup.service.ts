import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  // Um BehaviorSubject para guardar o estado (visível/invisível) do popup.
  private showLoginPopupSubject = new BehaviorSubject<boolean>(false);

  // Um Observable que os componentes podem "ouvir" para saber quando mostrar/esconder.
  showLoginPopup$ = this.showLoginPopupSubject.asObservable();

  /**
   * Avisa que o popup deve ser aberto.
   */
  openLoginPopup() {
    this.showLoginPopupSubject.next(true);
  }

  /**
   * Avisa que o popup deve ser fechado.
   */
  closeLoginPopup() {
    this.showLoginPopupSubject.next(false);
  }
}
