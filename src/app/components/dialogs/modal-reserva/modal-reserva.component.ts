import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { InputtextComponent } from "../../inputs/inputtext/inputtext.component";
import { ClienteAvulso } from '../../../entity/ClienteAvulso';
import { ButtonComponent } from '../../buttons/button/button.component';
import { Vaga } from '../../../entity/Vaga';
import { VagaService } from '../../../screens/reservagas/service/vaga.service';

@Component({
  selector: 'app-modal-reserva',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormField, MatLabel, CommonModule, InputtextComponent, ButtonComponent],
  templateUrl: './modal-reserva.component.html',
  styleUrl: './modal-reserva.component.css'
})
export class ModalReservaComponent {

  clienteAvulso: ClienteAvulso = new ClienteAvulso();
  vaga: Vaga = new Vaga();

  constructor(
    public dialogRef: MatDialogRef<ModalReservaComponent>,
    private vagaService: VagaService, 
    @Inject(MAT_DIALOG_DATA) public data: any // Recebe dados passados para o diálogo, se necessário
  ){ 
    this.vaga = data.vaga;
  }

  salvarClienteAvulso() {
    this.vagaService.criarReserva(this.vaga.id, this.clienteAvulso).subscribe({
      next: () => {
        this.vaga.disponivel = false;
        this.atualizarVaga();
      },
      error: (error) => {
        console.error('Erro ao criar reserva:', error);
      } 
    });
  }
  
  atualizarVaga() {
    this.vagaService.atualizarVaga(this.vaga).subscribe({
      next: () => {
        // Passa um sinal para o componente principal quando a reserva é criada
        this.dialogRef.close({ reservaCriada: true });
      },
      error: (error) => {
        console.error('Erro ao atualizar a vaga:', error);
      }
    });
  }

  cancelar() {
    this.dialogRef.close(); // Fecha o diálogo sem retornar dados
  }

}
