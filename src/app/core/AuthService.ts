import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// A interface do usuário que você já tem
interface User {
  id: string;
  username: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private userDataKey = 'user_data';

  // 1. O CORAÇÃO DA MUDANÇA:
  // Um BehaviorSubject que armazena o estado atual do usuário.
  // Ele começa lendo o que já estiver no localStorage.
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());

  // 2. OBSERVABLE PÚBLICO:
  // Os componentes vão "ouvir" este observable para saber quando o usuário muda.
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    console.log('[AuthService DEBUG] Serviço inicializado.');
    // Log para ver o que o BehaviorSubject está emitindo
    this.user$.subscribe(user => {
      console.log('[AuthService DEBUG] user$ emitiu um novo valor:', user);
    });
  }

  // Método privado que lê o estado inicial do localStorage
  private getUserFromStorage(): User | null {
    console.log('[AuthService DEBUG] Tentando ler usuário do localStorage...');
    // No Angular moderno, é mais seguro verificar se o código está rodando no navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const rawData = localStorage.getItem(this.userDataKey);
      if (rawData) {
        console.log('[AuthService DEBUG] Encontrou dados no localStorage:', rawData);
        return JSON.parse(rawData);
      } else {
        console.log('[AuthService DEBUG] Nenhum dado de usuário encontrado no localStorage.');
        return null;
      }
    }
    console.log('[AuthService DEBUG] Não está no ambiente do navegador. Retornando nulo.');
    return null;
  }

  loginWithDiscord() {
    console.log('[AuthService DEBUG] Iniciando login com Discord...');
    window.location.href = 'http://localhost:8181/oauth2/authorization/discord';
  }

  handleLoginResponse(response: { token: string; user: User }) {
    console.log('[AuthService DEBUG] handleLoginResponse foi chamado com:', response);

    if (!response || !response.token || !response.user) {
      console.error('[AuthService DEBUG] Resposta inválida recebida em handleLoginResponse.');
      return;
    }

    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userDataKey, JSON.stringify(response.user));
    console.log('[AuthService DEBUG] Token e dados do usuário salvos no localStorage.');

    // 3. AVISO DE MUDANÇA:
    // Avisa a todos os componentes (como o UserProfile) que um novo usuário logou.
    console.log('[AuthService DEBUG] Notificando sobre a mudança de usuário...');
    this.userSubject.next(response.user);
  }

  logout() {
    console.log('[AuthService DEBUG] Logout chamado.');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userDataKey);

    // 4. AVISO DE MUDANÇA:
    // Avisa a todos que o usuário fez logout (agora é nulo).
    console.log('[AuthService DEBUG] Notificando sobre o logout do usuário...');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  // Seus outros métodos continuam iguais e funcionais
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
