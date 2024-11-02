import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ClienteAvulso } from '../../../model/ClienteAvulso';
import { Vaga } from '../../../model/Vaga';
import { VagaService } from '../../../screens/reservagas/service/vaga.service';
import { ButtonComponent } from '../../buttons/button/button.component';
import { InputtextComponent } from "../../inputs/text/inputtext/inputtext.component";
import { LoaderService } from '../../../service/loader.service';
import { finalize } from 'rxjs';

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
    private loader: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ 
    this.vaga = data.vaga;
  }

  salvarClienteAvulso() {
    this.loader.show();
    this.vagaService.criarReserva(this.vaga.id, this.clienteAvulso).pipe(finalize(() => {this.loader.hide()})).subscribe({
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
        this.dialogRef.close({ reservaCriada: true });
      },
      error: (error) => {
        console.error('Erro ao atualizar a vaga:', error);
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
