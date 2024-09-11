import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Preco } from '../../../model/Preco';
import { Reserva } from '../../../model/Reserva';
import { TabelaDePrecos } from '../../../model/TabelaDePrecos';
import { Vaga } from '../../../model/Vaga';
import { EstacionamentoService } from '../../../screens/reservagas/service/estacionamento.service';
import { ReservaService } from '../../../screens/reservagas/service/reserva.service';
import { VagaService } from '../../../screens/reservagas/service/vaga.service';
import { ButtonComponent } from '../../buttons/button/button.component';
import { InputtextComponent } from "../../inputs/inputtext/inputtext.component";
import { ToggleComponent } from '../../inputs/toggle/toggle.component';

@Component({
  selector: 'app-modal-fechar-reserva',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormField, MatLabel, CommonModule, InputtextComponent, ButtonComponent, ToggleComponent],
  templateUrl: './modal-fechar-reserva.component.html',
  styleUrl: './modal-fechar-reserva.component.css'
})

export class ModalFecharReservaComponent implements OnInit {

  vaga: Vaga = new Vaga();
  tabelaPrecos: TabelaDePrecos = new TabelaDePrecos();
  precos: Preco[] = [];
  reserva: Reserva; // Agora usamos a reserva passada
  valorCalculado: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalFecharReservaComponent>,
    private vagaService: VagaService,
    private reservaService: ReservaService,
    private estacionamentoService: EstacionamentoService,
    @Inject(MAT_DIALOG_DATA) public data: { vaga: Vaga, reserva: Reserva }
  ) {
    this.vaga = data.vaga;
    this.reserva = data.reserva;
  }

  ngOnInit(): void {
    this.reserva.dataHoraTermino = new Date();
    this.buscarTabelaDePrecos();
  }

  buscarTabelaDePrecos(): void {
    const estacionamentoId = this.vaga.estacionamento.id;
    this.estacionamentoService.carregarTabelaDePrecoPorEstacionamento(estacionamentoId).subscribe((response: TabelaDePrecos) => {
      this.tabelaPrecos = response;
      this.precos = this.tabelaPrecos.precos;
      this.calcularValorReserva();
    });
  }

  calcularValorReserva(): void {
    const ultimaReserva = this.reserva;
    const dataHoraReserva = new Date(ultimaReserva.dataHoraReserva).getTime();
    const dataHoraTermino = new Date(ultimaReserva.dataHoraTermino!).getTime();
    const tempoTotal = (dataHoraTermino - dataHoraReserva) / 60000;

    const precoCorrespondente = this.encontrarPreco(tempoTotal);

    ultimaReserva.valor = precoCorrespondente;
    this.valorCalculado = precoCorrespondente;
  }

  encontrarPreco(tempoTotal: number): number {
    if (tempoTotal < this.precos[0].tempoMinimo) {
      return this.precos[0].valor;
    }

    const faixa = this.precos.find(preco => tempoTotal >= preco.tempoMinimo && tempoTotal <= preco.tempoMaximo);
    return faixa ? faixa.valor : this.precos[this.precos.length - 1].valor; 
  }

  fecharReserva(): void {
    const ultimaReserva = this.reserva;
    ultimaReserva.pago = true;
    ultimaReserva.valor = this.valorCalculado;
    this.vaga.disponivel = true;
    this.vagaService.atualizarVaga(this.vaga).subscribe(() => {
      this.atualizarReserva(ultimaReserva);
    });

  }

  atualizarReserva(ultimaReserva: Reserva): void {
    this.reservaService.atualizarReserva(ultimaReserva).subscribe({
      next: (result) => {
        this.dialogRef.close();
      },
      error: (error) => {
        
      }
    })
  }

  formatarData(data: Date | null): string {
    if (!data) return '';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    return new Date(data).toLocaleDateString('pt-BR', options);
  }

  get dataHoraTerminoFormatada(): string {
    return this.formatarData(this.reserva.dataHoraTermino);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  onDisponivelChange(checked: boolean): void {
    this.reserva.pago = checked;
  }

}
