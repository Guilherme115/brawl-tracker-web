import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './AuthService';
import { PopupService } from './popup.service'; // Importe o novo serviço
import { first, map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const popupService = inject(PopupService); // Injete o novo serviço

  return authService.user$.pipe(
    first(),
    map(user => !!user), // Continua retornando true se logado, false se não
    tap(isLoggedIn => {
      // O operador 'tap' executa uma ação sem modificar o resultado.
      if (!isLoggedIn) {
        console.log('AuthGuard: Acesso negado. Abrindo o popup de login.');
        // Se não estiver logado, pede para o serviço abrir o popup.
        popupService.openLoginPopup();
      }
    })
  );
};
