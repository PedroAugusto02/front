import { AfterViewInit, Component } from '@angular/core';
import { TitleService } from '../../../service/title.service';
import { InputSelectComponent } from '../../../components/inputs/inputselect/inputselect.component';
import { Estacionamento } from '../../../entity/Estacionamento';
import { LoaderService } from '../../../service/loader.service';
import { EstacionamentoService } from '../service/estacionamento.service';
import { finalize } from 'rxjs';
import { AuthService } from '../../../authentication/auth.service';
import { TableExpandableRowsExample } from '../../../components/tables/table/table.component';
import { DynamicTableComponent } from "../../../components/tables/dynamic-table/dynamic-table.component";
import { TabelaDePrecos } from '../../../entity/TabelaDePrecos';
import { Preco } from '../../../entity/Preco';
import { PrecosService } from '../service/precos.service';
import { ButtonComponent } from '../../../components/buttons/button/button.component';

@Component({
  selector: 'app-tabela-de-precos',
  standalone: true,
  imports: [
    InputSelectComponent,
    TableExpandableRowsExample,
    DynamicTableComponent,
    ButtonComponent,
  ],
  templateUrl: './tabela-de-precos.component.html',
  styleUrl: './tabela-de-precos.component.css'
})
export class TabelaDePrecosComponent implements AfterViewInit {

  constructor(
    private loader: LoaderService,
    private titleService: TitleService,
    private estacionamentoService: EstacionamentoService,
    private authService: AuthService,
    private precosService: PrecosService,
  ) {
    this.titleService.setPageTitle("Preços");
  }

  estacionamentos: Estacionamento[] = [];
  tabelaDePreco: TabelaDePrecos = new TabelaDePrecos();
  precos: Preco[] = [];
  selectedEstacionamentoId: number | null = null;

  ngAfterViewInit(): void {
    this.carregarEstacionamentos();
  }

  async carregarEstacionamentos(): Promise<void> {
    this.loader.show();
    await this.authService.fetchLoggedInUser();
    const usuario = this.authService.getLoggedInUser();
    if (usuario.role == "DONO") {
      this.estacionamentoService.listarEstacionamentosPorUsuario(usuario.id).pipe(
        finalize(() => {
          this.loader.hide();
        })
      ).subscribe({
        next: (estacionamentos) => {
          this.estacionamentos = estacionamentos;
        },
        error: (error) => {
          console.log('Erro ao carregar estacionamentos:', error);
        },
      });
    } else if (usuario.role == "ADMIN") {
      this.estacionamentoService.listarEstacionamentos().pipe(finalize(() => {
        this.loader.hide();
      })).subscribe({
        next: (estacionamentos) => {
          this.estacionamentos = estacionamentos;
        },
        error: (error) => {
          console.log('Erro ao carregar estacionamentos:', error);
        }
      }
      );
    }
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
    if (this.selectedEstacionamentoId !== null && this.tabelaDePreco) {
      // Cria o objeto Preco com a tabela de preços associada
      const novoPreco: Preco = {
        id: 0,
        tempoMinimo: 0, // Assumindo que os valores são obtidos de algum lugar
        tempoMaximo: 0,
        valor: 0,
        tabelaDePrecos: { id: this.tabelaDePreco.id } // Somente o ID é necessário
      };
 
      this.precosService.adicionarPreco(novoPreco).subscribe({
        next: (result) => {
          this.precos.push(result); // Adiciona o resultado ao array
        },
        error: (error) => {
          console.error('Erro ao adicionar preço', error);
        }
      });
    }
 }
 

}
