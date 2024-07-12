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

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  standalone: true,
  imports: [InputtextComponent,ButtonComponent,CheckboxComponent,CdkDropListGroup, CdkDropList, CdkDrag,CommonModule,InputselectComponent],
  styleUrls: ['./vaga.component.css']
})
export class VagaComponent implements OnInit {
  vagas_lista: Vaga[] = [];
  estacionamentos: Estacionamento[] = [];
  selectedEstacionamento: Estacionamento | null = null; // Inicialmente nenhum estacionamento selecionado
  cardsVagas: any[] = []; 

  constructor(
    private vagaService: VagaService,
    private estacionamentoService: EstacionamentoService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.carregarEstacionamentos();
    this.carregarVagas(); // Carrega as vagas inicialmente
    setTimeout(() => {
      this.titleService.setPageTitle("Vagas");
    }, 10);
  }

  carregarVagas(): void {
    this.vagaService.listarVagas().subscribe(
      vagas => {
        this.vagas_lista = vagas;
      },
      error => {
        console.log('Erro ao carregar vagas:', error);
      }
    );
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
    this.cardsVagas = []; // Limpar o array de cards antes de gerar novamente

    if (this.selectedEstacionamento) {
      const quantidadeVagas = this.selectedEstacionamento.quantidadeVagas;

      for (let i = 1; i <= quantidadeVagas; i++) {
        const card = {
          numero: i,
          status: 'Disponível' // Você pode adicionar mais propriedades conforme necessário
        };
        this.cardsVagas.push(card);
      }
    }
  }

}
