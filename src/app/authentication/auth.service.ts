import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../service/loader.service';
import { finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { ModalService } from '../service/modal.service';
import { Usuario } from '../entity/Usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth/login`;
  private registerUrl = `${environment.apiUrl}/auth/register`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loader: LoaderService,
    private modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(login: string, password: string) {
    this.loader.show();
    return this.http.post<{ token: string }>(`${this.apiUrl}`, { login, password }).pipe(
      finalize(() => {
        this.loader.hide();
      })
    ).subscribe({
      next: (response) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
        }
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.status == 401)
          errorMessage = error.error;
        else if(error.status == 404)
            errorMessage = error.error;
        else
          errorMessage = 'Erro desconhecido ao fazer login';
        this.modalService.showError(errorMessage);
        console.log('Erro ao fazer login:', error);
      }
    });
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
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
}
