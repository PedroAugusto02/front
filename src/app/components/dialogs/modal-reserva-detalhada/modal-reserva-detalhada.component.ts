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

@Component({
  selector: 'app-modal-reserva-detalhada',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, CommonModule, ButtonComponent],
  templateUrl: './modal-reserva-detalhada.component.html',
  styleUrls: ['./modal-reserva-detalhada.component.css']
})
export class ModalReservaDetalhadaComponent implements OnInit {

  vaga: Vaga = new Vaga();
  reservas: Reserva[] = [];
  displayedColumns: string[] = ['horario', 'cliente', 'acao'];

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
}
