import { AfterViewInit, Component } from '@angular/core';
import { TitleService } from '../../../service/title.service';
import { InputSelectComponent } from '../../../components/inputs/inputselect/inputselect.component';
import { Estacionamento } from '../../../entity/Estacionamento';
import { LoaderService } from '../../../service/loader.service';
import { EstacionamentoService } from '../service/estacionamento.service';
import { finalize } from 'rxjs';
import { AuthService } from '../../../authentication/auth.service';
import { Preco } from '../../../entity/Preco';
import { PrecosService } from '../service/precos.service';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { CommonModule } from '@angular/common';
import { InputtextComponent } from '../../../components/inputs/inputtext/inputtext.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InputNumberValorComponent } from '../../../components/inputs/input-number/input-number-valor.component';
import { Usuario } from '../../../entity/Usuario';

@Component({
  selector: 'app-tabela-de-precos',
  standalone: true,
  imports: [
    InputSelectComponent,
    InputNumberValorComponent,
    ButtonComponent,
    CommonModule,
    InputtextComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './tabela-de-precos.component.html',
  styleUrls: ['./tabela-de-precos.component.css'],
})
export class TabelaDePrecosComponent implements AfterViewInit {

  estacionamentos: Estacionamento[] = [];
  tabelaDePreco: any = {}; // Atualize conforme necessário
  precos: Preco[] = [];
  selectedEstacionamentoId: number = 0;
  columnsToDisplay = ['tempoMinimo', 'tempoMaximo', 'valor', 'actions']; // Personalize os nomes das colunas
  editandoElemento: Preco = new Preco(); // Para rastrear o elemento em edição
  usuarioLogado: Usuario = new Usuario();

  constructor(
    private loader: LoaderService,
    private titleService: TitleService,
    private estacionamentoService: EstacionamentoService,
    private authService: AuthService,
    private precosService: PrecosService,
  ) {
    this.titleService.setPageTitle("Preços");
  }

  ngAfterViewInit(): void {
    this.carregarEstacionamentosETabelaPreco();
  }

  async carregarEstacionamentosETabelaPreco() {
    await this.authService.fetchLoggedInUser();
    this.usuarioLogado = this.authService.getLoggedInUser();
    await this.carregarEstacionamentos();

    if(this.usuarioLogado.role == "DONO")
      this.selecionarEstacionamento(this.estacionamentos[0].id);
  }

  async carregarEstacionamentos(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.loader.show();
      if (this.usuarioLogado.role == "DONO") {
        this.estacionamentoService.listarEstacionamentosPorUsuario(this.usuarioLogado.id).pipe(
          finalize(() => {
            this.loader.hide();
          })
        ).subscribe({
          next: (estacionamentos) => {
            this.estacionamentos = estacionamentos;
            resolve();
          },
          error: (error) => {
            console.log('Erro ao carregar estacionamentos:', error);
            reject();
          },
        });
      } else if (this.usuarioLogado.role == "ADMIN") {
        this.estacionamentoService.listarEstacionamentos().pipe(finalize(() => {
          this.loader.hide();
        })).subscribe({
          next: (estacionamentos) => {
            this.estacionamentos = estacionamentos;
            resolve();
          },
          error: (error) => {
            console.log('Erro ao carregar estacionamentos:', error);
            reject();
          }
        });
      }
    })
  }

  selecionarEstacionamento(id: number): void {
    this.selectedEstacionamentoId = id;
    this.carregarTabelaDePreco(id);
  }

  carregarTabelaDePreco(estacionamentoId: number): void {
    this.estacionamentoService.carregarTabelaDePrecoPorEstacionamento(estacionamentoId).subscribe({
      next: (tabela) => {
        this.tabelaDePreco = tabela;
        this.precos = tabela.precos ? tabela.precos : [];
      },
      error: (error) => {
        console.error('Erro ao carregar a tabela de preço', error);
      }
    });
  }

  adicionarPreco(): void {
    if (this.selectedEstacionamentoId !== null && this.tabelaDePreco && this.tabelaDePreco.id) {
      const novoPreco: Preco = {
        id: 0,
        tempoMinimo: 0,
        tempoMaximo: 0,
        valor: 0,
        tabelaDePrecos: { id: this.tabelaDePreco.id }
      };

      this.precosService.adicionarPreco(novoPreco).subscribe({
        next: (result) => {
          this.precos.push(result);
          this.carregarTabelaDePreco(this.selectedEstacionamentoId);
        },
        error: (error) => {
          console.error('Erro ao adicionar preço', error);
        }
      });
    } else {
      console.error('Tabela de Preços ID está nulo');
    }
  }



  // Função para iniciar a edição de uma linha
  editarElemento(elemento: Preco): void {
    this.editandoElemento = { ...elemento };
  }

  salvarEdicao(elemento: Preco): void {
    if (this.tabelaDePreco && this.tabelaDePreco.id) {
      elemento.tabelaDePrecos = { id: this.tabelaDePreco.id };
      this.precosService.atualizarPreco(elemento).subscribe({
        next: () => {
          const index = this.precos.findIndex(p => p.id === elemento.id);
          if (index !== -1) {
            this.precos[index] = elemento;
          }
          this.editandoElemento = new Preco();
          this.carregarTabelaDePreco(this.selectedEstacionamentoId);
        },
        error: (error: any) => {
          console.error('Erro ao atualizar preço', error);
        }
      });
    } else {
      console.error('Tabela de Preços não encontrada');
    }
  }

  deletarPreco(elemento: Preco): void {
    if (this.tabelaDePreco && this.tabelaDePreco.id) {
      elemento.tabelaDePrecos = { id: this.tabelaDePreco.id };
      this.precosService.deletarPreco(elemento).subscribe({
        next: () => { 
          this.carregarTabelaDePreco(this.selectedEstacionamentoId);
        },
        error: (error: any) => {
          console.error('Erro ao atualizar preço', error);
        }
      });
    } else {
      console.error('Tabela de Preços não encontrada');
    }
  }

  // Função para cancelar a edição
  cancelarEdicao(): void {
    this.editandoElemento = new Preco();
  }

  handleValueChange(newValue: number): void {
    console.log('Componente Pai Handle ValueChange:', newValue); // Verifica o valor recebido
    this.editandoElemento.valor = newValue;
    console.log('Editando Elemento Atualizado:', this.editandoElemento); // Verifica o valor atualizado
  }
  

}
