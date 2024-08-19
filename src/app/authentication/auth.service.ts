import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../service/loader.service';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ModalService } from '../service/modal.service';
import { Usuario } from '../entity/Usuario';
import { Estacionamento } from '../entity/Estacionamento';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth/login`;
  private registerUrl = `${environment.apiUrl}/auth/register`;
  private userUrl = `${environment.apiUrl}/auth/user`;
  private userPasswordChangeUrl = `${environment.apiUrl}/auth/reset-password`;
  private usuarioLogado!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loader: LoaderService,
    private modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(login: string, password: string) {
    this.loader.show();
    return this.http.post<{ token: string, userId: number, resetPassword: boolean }>(`${this.apiUrl}`, { login, password }).pipe(
      finalize(() => {
        this.loader.hide();
      })
    ).subscribe({
      next: async (response) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.userId.toString());
        }
        await this.fetchLoggedInUser();
        if (response.resetPassword) {
          this.router.navigate(['/reset-password']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.handleLoginError(error);
      }
    });
  }

  handleLoginError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status === 401) errorMessage = error.error;
    else if (error.status === 404) errorMessage = error.error;
    else errorMessage = 'Erro desconhecido ao fazer login';
    this.modalService.showError(errorMessage);
    console.log('Erro ao fazer login:', error);
  }

  register(usuario: Usuario) {
    this.loader.show();
    return this.http.post<Usuario>(`${this.registerUrl}`, usuario).pipe(
      finalize(() => {
        this.loader.hide();
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  fetchLoggedInUser(): Promise<void> {
    this.loader.show();
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return Promise.reject('Token não encontrado no armazenamento');
    }
    const headers = { 'Authorization': `Bearer ${token}` };
    return new Promise((resolve, reject) => {
      this.http.get<Usuario>(this.userUrl, { headers }).pipe(finalize(() => {
        this.loader.hide();
      })).subscribe({
        next: (user) => {
          this.usuarioLogado = user;
          resolve();
        },
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao buscar dados do usuário:', error);
          reject();
        }
      });
    });
  }

  resetPassword(userId: number, newPassword: string): Observable<any> {
    return this.http.put(`${this.userPasswordChangeUrl}`, { userId, newPassword });
  }

  isFirstLogin(): boolean {
    const passwordResetRequired = this.usuarioLogado.passwordResetRequired;
    return passwordResetRequired === true;
  }
  
  getLoggedInUser(): Usuario {
    return this.usuarioLogado;
  }

  getUserRole(): String {
    return this.usuarioLogado.role;
  }

  getEstacionamentosByUsuarioId(usuarioId: number) {
    return this.http.get<Estacionamento[]>(`${environment.apiUrl}/usuarios/${usuarioId}/estacionamentos`);
  }

}
