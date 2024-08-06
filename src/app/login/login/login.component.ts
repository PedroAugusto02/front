import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../authentication/auth.service';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { InputPasswordComponent } from "../../components/inputs/input-password/input-password.component";
import { InputtextComponent } from '../../components/inputs/inputtext/inputtext.component';
import { ToggleDarkThemeComponent } from '../../components/inputs/toggle-dark-theme/toggle-dark-theme.component';
import { LoaderCircularComponent } from '../../components/loader-circular/loader-circular.component';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatToolbarModule, ToggleDarkThemeComponent, InputtextComponent, ButtonComponent, InputPasswordComponent,LoaderCircularComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  login: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private loader: LoaderService,
  ) { }

  loginMethod() {
    this.loader.show();
    this.authService.login(this.login, this.password);
  }

  cadastrar() {
    
  }
}
