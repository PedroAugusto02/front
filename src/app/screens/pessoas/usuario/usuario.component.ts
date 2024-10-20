import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { TitleService } from '../../../service/title.service';
import { AuthService } from '../../../authentication/auth.service';
import { Usuario } from '../../../model/Usuario';
import { InputtextComponent } from "../../../components/inputs/inputtext/inputtext.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [MatTabsModule, MatIcon, InputtextComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  usuarioLogado: Usuario = new Usuario();

  constructor(
    private titleService: TitleService,
    private authService: AuthService,
  ) {
    this.titleService.setPageTitle("Usuario");
  }

  ngOnInit(): void {
    this.iniciaUsuario();
  }

  async iniciaUsuario() {
    await this.authService.fetchLoggedInUser();
    this.usuarioLogado = this.authService.getLoggedInUser();
  }

}
