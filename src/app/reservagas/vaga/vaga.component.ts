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

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  standalone: true,
  imports: [InputtextComponent,ButtonComponent,CheckboxComponent,CdkDropListGroup, CdkDropList, CdkDrag,CommonModule,InputselectComponent],
  styleUrls: ['./vaga.component.css']
})
export class VagaComponent implements OnInit {

  vagas_lista: Vaga[] = [];
  vagas_update: Vaga[] = [];
  vagaNova: Vaga = new Vaga();
  vagaUpdate: Vaga = new Vaga();
  estacionamentos: Estacionamento[] = [];

  constructor(
    private vagaService: VagaService,
    private estacionamentoService: EstacionamentoService
  ) { }

  ngOnInit(): void {
    this.carregarVagas();
    this.carregarEstacionamentos();
  }

  refresh() {
    this.vagaUpdate = new Vaga();
    this.vagaNova = new Vaga();
    this.vagas_update = [];
    this.carregarVagas();
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

  adicionarVaga(): void {
    this.vagaService.criarVaga(this.vagaNova).subscribe(
      novaVaga => {
        this.vagas_lista.push(novaVaga);
        this.refresh();
      },
      error => {
        console.log('Erro ao adicionar vaga:', error);
      }
    );
  }

  salvarVaga(): void {
    this.vagaService.atualizarVaga(this.vagaUpdate.id, this.vagaUpdate).subscribe(
      () => {
        this.refresh();
      },
      error => {
        console.log('Erro ao salvar vaga:', error);
      }
    );
  }

  deletarVaga(id: number): void {
    this.vagaService.deletarVaga(id).subscribe(
      () => {
        this.refresh();
      },
      error => {
        console.log('Erro ao excluir vaga:', error);
      }
    );
  }

  dropUpdate(event: any, vagas: Vaga[]): void {
    // Lógica para manipular o drop, se necessário
    this.vagaUpdate = vagas[0];
  }

  drop(event: any): void {
    // Lógica para manipular o drop, se necessário
  }
}
