import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoaderCircularComponent } from '../../components/loader-circular/loader-circular.component';
import { InputPasswordComponent } from '../../components/inputs/text/input-password/input-password.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { InputtextComponent } from '../../components/inputs/text/inputtext/inputtext.component';
import { ToggleDarkThemeComponent } from '../../components/inputs/toggle-dark-theme/toggle-dark-theme.component';
import { AuthService } from '../../authentication/auth.service';
import { TitleService } from '../../service/title.service';
import { LoaderService } from '../../service/loader.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatToolbarModule,
    ToggleDarkThemeComponent, 
    InputtextComponent,
     ButtonComponent, 
     InputPasswordComponent,
     LoaderCircularComponent
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  login: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private loader: LoaderService,
  ) { 
    this.titleService.setPageTitle("Login");
  }

  async fazerLogin() {
    this.loader.show();
    this.authService.login(this.login, this.password);
  }

  cadastrar() {
    
  }
}
