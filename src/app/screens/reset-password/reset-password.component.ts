import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

import { ToggleDarkThemeComponent } from '../../components/inputs/toggle-dark-theme/toggle-dark-theme.component';
import { InputtextComponent } from '../../components/inputs/text/inputtext/inputtext.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { InputPasswordComponent } from '../../components/inputs/text/input-password/input-password.component';
import { LoaderCircularComponent } from '../../components/loader-circular/loader-circular.component';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatToolbarModule, ToggleDarkThemeComponent, InputtextComponent, ButtonComponent, InputPasswordComponent,LoaderCircularComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  newPassword: string = '';
  confirmPassword: string = '';
  userId!: number;

  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private router: Router
  ) {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    this.loader.show();
    this.authService.resetPassword(this.userId, this.newPassword).subscribe({
      next: () => {
        this.loader.hide();
        if (this.authService.isFirstLogin()) {
          this.router.navigate(['/primeiro-estacionamento']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        this.loader.hide();
        console.error('Erro ao redefinir senha:', error);
        alert('Erro ao redefinir senha');
      }
    });
  }

  voltar() {
    this.router.navigate(['/login']);
  }
  
}
