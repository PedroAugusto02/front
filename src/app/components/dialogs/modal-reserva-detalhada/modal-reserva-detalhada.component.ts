import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { VagaService } from '../../../screens/reservagas/service/vaga.service';
import { Vaga } from '../../../model/Vaga';
import { Reserva } from '../../../model/Reserva';
import { ButtonComponent } from '../../buttons/button/button.component';
import { ModalReservaComponent } from '../modal-reserva/modal-reserva.component';
import { DatePickerComponent } from "../../inputs/date-picker/date-picker.component";
import { InputtextComponent } from "../../inputs/text/inputtext/inputtext.component";

@Component({
  selector: 'app-modal-reserva-detalhada',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, CommonModule, ButtonComponent, DatePickerComponent, InputtextComponent],
  templateUrl: './modal-reserva-detalhada.component.html',
  styleUrls: ['./modal-reserva-detalhada.component.css']
})
export class ModalReservaDetalhadaComponent implements OnInit {

  vaga: Vaga = new Vaga();
  reservas: Reserva[] = [];
  horarioDeInicio!: number;
  horarioDeFim!: number;
  
  dataEscolhida!: Date;

  constructor(
    public dialog: MatDialog, // Injetando MatDialog
    public dialogRef: MatDialogRef<ModalReservaDetalhadaComponent>,
    private vagaService: VagaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vaga = data.vaga;
  }

  ngOnInit(): void {
    this.buscarReservas();
  }

  buscarReservas(): void {
    this.vagaService.buscarReservasPorVaga(this.vaga.id).subscribe({
      next: (reservas: Reserva[]) => {
        this.reservas = reservas;
      },
      error: (error) => {
        console.error('Erro ao buscar reservas:', error);
      }
    });
  }

  incluirReserva(reserva: Reserva): void {
    // Lógica para abrir modal e incluir nova reserva no horário escolhido
    const dialogRef = this.dialog.open(ModalReservaComponent, {
      data: { vaga: this.vaga, reserva: reserva }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.reservaCriada) {
        this.buscarReservas(); // Recarregar reservas
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  mascara(event: any, horario: string): void {
    // Remove caracteres não numéricos
    let valor = event.target.value.replace(/\D/g, '');

    // Adiciona o ":" após os primeiros 2 dígitos
    if (valor.length >= 2) {
      valor = valor.replace(/^(\d{2})(\d)/, '$1:$2');
    }

    // Limita o input ao formato "HH:MM"
    if (valor.length > 5) {
      valor = valor.slice(0, 5);
    }

    // Atualiza o valor formatado no campo e na variável
    event.target.value = valor;
    if(horario == 'Inicio')
      this.horarioDeInicio = valor;
    else
      this.horarioDeFim = valor;
  }

  salvarClienteAvulso() {
    
  }

}
