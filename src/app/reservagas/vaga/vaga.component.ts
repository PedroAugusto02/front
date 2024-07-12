import { Component, OnInit } from '@angular/core';
import { EstacionamentoService } from '../service/estacionamento.service';
import { Vaga } from '../../entity/Vaga';
import { Estacionamento } from '../../entity/Estacionamento';
import { VagaService } from '../service/vaga.service';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { InputtextComponent } from '../../components/inputs/inputtext/inputtext.component';
import { CheckboxComponent } from '../../components/inputs/checkbox/checkbox.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { InputselectComponent } from '../../components/inputs/inputselect/inputselect.component';
import { TitleService } from '../../service/title.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  standalone: true,
  imports: [InputtextComponent,ButtonComponent,CheckboxComponent,CdkDropListGroup, CdkDropList, CdkDrag,CommonModule,InputselectComponent],
  styleUrls: ['./vaga.component.css']
})
export class VagaComponent implements OnInit {
  estacionamentos: Estacionamento[] = [];
  selectedEstacionamento: Estacionamento | null = null;
  cardsVagas: Vaga[] = [];

  constructor(
    private vagaService: VagaService,
    private estacionamentoService: EstacionamentoService,
    private router: Router,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.carregarEstacionamentos();
    setTimeout(() => {
      this.titleService.setPageTitle("Vagas");
    }, 10);
  }

  carregarEstacionamentos(): void {
    this.estacionamentoService.listarEstacionamentos().subscribe(
      estacionamentos => {
        this.estacionamentos = estacionamentos;
      },
      error => {
        console.log('Erro ao carregar estacionamentos:', error);
      }
    );
  }

  selecionarEstacionamento(estacionamento: Estacionamento): void {
    this.selectedEstacionamento = estacionamento;
    this.gerarCardsDeVagas();
  }

  gerarCardsDeVagas(): void {
    this.cardsVagas = [];

    if (this.selectedEstacionamento) {
      const quantidadeVagas = this.selectedEstacionamento.quantidadeVagas;

      for (let i = 1; i <= quantidadeVagas; i++) {
        const vaga: Vaga = {
          id: i,
          estacionamento: this.selectedEstacionamento,
          disponivel: true,
          reservas: []
        };
        this.cardsVagas.push(vaga);
      }
    }
  }

  abrirDetalhesReserva(vaga: Vaga): void {
    // Navega para a página de detalhes da reserva, passando a vaga completa como parâmetro
    this.router.navigateByUrl(`/reserva-detalhes`, { state: { vaga } });
  }

}
