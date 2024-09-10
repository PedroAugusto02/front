import { Component } from '@angular/core';
import { InputtextComponent } from '../../components/inputs/inputtext/inputtext.component';
import { Estacionamento } from '../../model/Estacionamento';
import { TitleService } from '../../service/title.service';
import { LoaderService } from '../../service/loader.service';
import { EstacionamentoService } from '../reservagas/service/estacionamento.service';
import { finalize } from 'rxjs';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { MatToolbar } from '@angular/material/toolbar';
import { LoaderCircularComponent } from '../../components/loader-circular/loader-circular.component';
import { AuthService } from '../../authentication/auth.service';
import { Usuario } from '../../model/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primeiro-estacionamento',
  standalone: true,
  imports: [
    InputtextComponent,
    ButtonComponent,
    MatToolbar,
    LoaderCircularComponent,
  ],
  templateUrl: './primeiro-estacionamento.component.html',
  styleUrl: './primeiro-estacionamento.component.css'
})
export class PrimeiroEstacionamentoComponent {

  estacionamentoNovo: Estacionamento = new Estacionamento();

  constructor(
    private titleService: TitleService,
    private loader: LoaderService,
    private estacionamentoService: EstacionamentoService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.titleService.setPageTitle("Criar Estacionamento");
  }

  adicionarEstacionamento(): void {
    this.loader.show();
    const usuario = this.authService.getLoggedInUser();

    this.estacionamentoService.criarEstacionamentoPorUsuario(this.estacionamentoNovo, usuario.id).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (novoEstacionamento) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Erro ao adicionar estacionamento:', error);
      }
    });
  }

}
