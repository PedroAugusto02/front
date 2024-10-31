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
import { InputNumberComponent } from "../../../components/inputs/text/input-number/input-number.component";
import { Estado } from '../../../model/Estado';
import { Cidade } from '../../../model/Cidade';

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
    InputEmailComponent,
    InputNumberComponent
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  usuarioLogado: Usuario = new Usuario();
  carros: Carro[] = [];
  estacionamentos: Estacionamento[] = [];
  estados: Estado[] = [];
  cidades: Cidade[] = [];

  estacionamentoSelecionadoId: number = 0;
  estadoSelecionadoId: number = 0;
  cidadeSelecionadoId: number = 0;

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
    this.loader.show();
    await Promise.all([
      this.obterEstados(),
      this.obterCidades(),
      this.carregarEstacionamentos(),
    ])
    this.loader.hide();
  }

  async carregarEstacionamentos(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.estacionamentoService.listarEstacionamentosPorUsuario(this.usuarioLogado.id).pipe(
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
    this.loader.show();
    this.utilService.obterCep(this.usuarioLogado.cep).pipe(finalize(() => { this.loader.hide() })).subscribe({
      next: async (viaCep) => {
        this.usuarioLogado.bairro = viaCep.bairro;
        this.usuarioLogado.ddd = viaCep.ddd;
        this.usuarioLogado.endereco = viaCep.logradouro;
        this.usuarioLogado.cep = viaCep.cep;
        this.usuarioLogado.ddd = viaCep.ddd;
        this.usuarioLogado.complemento = viaCep.complemento == undefined ? '' : '';

        
        const estadoCorrespondente = this.estados.find(estado => estado.nome === viaCep.estado);
        const cidadeCorrespondente = this.cidades.find(cidade => cidade.nome === viaCep.localidade);
        if (estadoCorrespondente) 
          this.estadoSelecionadoId = estadoCorrespondente.id;
        if (cidadeCorrespondente)
          this.cidadeSelecionadoId = cidadeCorrespondente.id;
      },
      error: (error) => {
        this.modal.showError("Não foi possível obter CEP");
      }
    });
  }


  obterEstados(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.utilService.obterEstados().subscribe({
        next: async (result) => {
          this.estados = result;
          resolve();
        },
        error: (error) => {
          reject();
          this.modal.showError("Não foi possível obter Estados " + error.error);
        }
      })
    })
  }

  obterCidadesPorEstado(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.estadoSelecionadoId) {
        this.loader.show();
        this.utilService.obterCidadesPorEstado(this.estadoSelecionadoId).pipe(finalize(() => {this.loader.hide();})).subscribe({
          next: (result) => {
            this.cidades = result;
            resolve();
          },
          error: (error) => {
            this.modal.showError("Não foi possível obter Cidades " + error.error);
            reject();
          }
        })
      }
      resolve();
    })
  }

  obterCidades(): Promise<void> {
    return new Promise((resolve,reject) => {
      this.utilService.obterCidades().subscribe({
        next: (result) => {
          this.cidades = result;
          resolve();
        },
        error: (error) => {
          this.modal.showError("Não foi possível obter Cidades" + error.error);
          reject();
        }
      })
    })

  }

  selecionarEstado(id: number): void {
    this.estadoSelecionadoId = id;
    this.obterCidadesPorEstado();
  }

  selecionarCidade(id: number): void {
    this.cidadeSelecionadoId = id;
  }

}
