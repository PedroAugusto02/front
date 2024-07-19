import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToggleDarkThemeComponent } from '../../components/inputs/toggle-dark-theme/toggle-dark-theme.component';
import { InputtextComponent } from '../../components/inputs/inputtext/inputtext.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatToolbarModule,ToggleDarkThemeComponent,InputtextComponent,ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  loginMethod() {
    this.authService.login(this.login, this.password);
  }

}
