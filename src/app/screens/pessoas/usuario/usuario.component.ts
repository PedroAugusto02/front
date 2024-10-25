import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TitleService } from '../../../service/title.service';
import { AuthService } from '../../../authentication/auth.service';
import { Usuario } from '../../../model/Usuario';
import { InputtextComponent } from "../../../components/inputs/text/inputtext/inputtext.component";
import { Carro } from '../../../model/Carro';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { LoaderService } from '../../../service/loader.service';
import { EstacionamentoService } from '../../reservagas/service/estacionamento.service';
import { Estacionamento } from '../../../model/Estacionamento';
import { finalize } from 'rxjs';
import { InputSelectComponent } from '../../../components/inputs/inputselect/inputselect.component';
import { InputTelefoneComponent } from "../../../components/inputs/text/input-telefone/input-telefone.component";
import { InputEmailComponent } from "../../../components/inputs/text/input-email/input-email.component";
import { MatButton, MatButtonModule } from '@angular/material/button';
import { UtilService } from '../../reservagas/service/util.service';
import { ModalService } from '../../../service/modal.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    MatButton,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatIcon,
    InputtextComponent,
    ButtonComponent,
    InputSelectComponent,
    InputTelefoneComponent,
    InputEmailComponent
],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  usuarioLogado: Usuario = new Usuario();
  carros: Carro[] = [];
  estacionamentos: Estacionamento[] = [];
  estacionamentoSelecionadoId: number = 0;

  constructor(
    private titleService: TitleService,
    private authService: AuthService,
    private loader: LoaderService,
    private estacionamentoService: EstacionamentoService,
    private utilService: UtilService,
    private modal: ModalService,
  ) {
    this.titleService.setPageTitle("Usuario");
  }

  ngOnInit(): void {
    this.iniciaUsuario();
  }

  async iniciaUsuario() {
    await this.authService.fetchLoggedInUser();
    this.usuarioLogado = this.authService.getLoggedInUser();
    this.carros = this.usuarioLogado.carros;
    this.carregarEstacionamentos();
  }

  async carregarEstacionamentos(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.loader.show();
      this.estacionamentoService.listarEstacionamentosPorUsuario(this.usuarioLogado.id).pipe(
        finalize(() => {
          this.loader.hide();
        })
      ).subscribe({
        next: (estacionamentos) => {
          this.estacionamentos = estacionamentos;
          this.estacionamentoSelecionadoId = this.estacionamentos[0].id;
          resolve();
        },
        error: (error) => {
          console.log('Erro ao carregar estacionamentos:', error);
          reject();
        },
      });
    })
  }

  selecionarEstacionamento(id: number): void {
    this.estacionamentoSelecionadoId = id;
  }

  salvarUsuario() {
  }

  buscarCEP() {
    this.utilService.obterCep(this.usuarioLogado.cep).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        this.modal.showError("Não foi possível obter CEP");
      }
    })
  }

}
