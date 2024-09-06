import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ButtonComponent } from '../../buttons/button/button.component';
import { InputtextComponent } from "../../inputs/inputtext/inputtext.component";
import { Vaga } from '../../../entity/Vaga';
import { VagaService } from '../../../screens/reservagas/service/vaga.service';
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
  intervalId: any;

  constructor(
    public dialogRef: MatDialogRef<ModalFecharReservaComponent>,
    private vagaService: VagaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vaga = data.vaga;
  }

  ngOnInit(): void {
    this.startCronometro();
  }

  startCronometro(): void {
    this.intervalId = setInterval(() => {
      this.atualizarTempoDecorrido();
    }, 1000);
  }

  atualizarTempoDecorrido(): void {
    const agora = new Date().getTime();
    const ultimaReserva = this.vaga.reservas.reduce((prev, current) => {
      return new Date(prev.dataHoraReserva).getTime() > new Date(current.dataHoraReserva).getTime() ? prev : current;
    });
    const tempoEntrada = new Date(ultimaReserva.dataHoraReserva).getTime();
    const diferenca = agora - tempoEntrada;
    this.vaga.tempoDecorrido = this.formatarTempo(diferenca);
  }

  formatarTempo(ms: number): string {
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    return `${this.pad(horas)}:${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  cancelar() {
    this.dialogRef.close();
  }

  onDisponivelChange(checked: boolean): void {
    this.vaga.reservas[0].pago = checked;
  }

}
