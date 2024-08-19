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

@Component({
  selector: 'app-tabela-de-precos',
  standalone: true,
  imports: [
    InputSelectComponent,
    TableExpandableRowsExample,
    DynamicTableComponent
],
  templateUrl: './tabela-de-precos.component.html',
  styleUrl: './tabela-de-precos.component.css'
})
export class TabelaDePrecosComponent implements AfterViewInit{

  constructor(
    private loader: LoaderService,
    private titleService: TitleService,
    private estacionamentoService: EstacionamentoService,
    private authService: AuthService,
    private precosService: PrecosService,
  ){
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
    if(usuario.role == "DONO") {
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
    }else if(usuario.role == "ADMIN") {
      this.estacionamentoService.listarEstacionamentos().pipe(finalize(() => {
        this.loader.hide();
      })).subscribe({
        next: (estacionamentos) => {
          this.estacionamentos = estacionamentos;
        },
        error: (error) => {
          console.log('Erro ao carregar estacionamentos:', error);
        }}
      );
    }
  }

  selecionarEstacionamento(id: number): void {
    this.selectedEstacionamentoId = id;
    this.carregarPrecos(id);
  }

  carregarPrecos(id: number): void {
    this.precosService.carregarPrecos(id)
      .subscribe(
        (data: Preco[]) => this.precos = data,
        (error) => console.error('Erro ao carregar preços', error)
      );
  }

  adicionarPreco(): void {
    if (this.selectedEstacionamentoId !== null) {
      // Cria o objeto Preco com o ID da tabela de preços
      const novoPreco: Preco = {
        id: 0,
        tempoMinimo: 0,
        tempoMaximo: 0,
        valor: 0,
        tabelaDePrecosId: this.selectedEstacionamentoId // Utiliza o ID da tabela de preços
      };
  
      this.precosService.adicionarPreco(novoPreco)
        .subscribe(
          (precoCriado: Preco) => this.precos = [...this.precos, precoCriado],
          (error) => console.error('Erro ao adicionar preço', error)
        );
    }
  }
  
  

}
