import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ButtonComponent } from '../../buttons/button/button.component';
import { InputtextComponent } from "../../inputs/inputtext/inputtext.component";
import { Vaga } from '../../../entity/Vaga';
import { VagaService } from '../../../screens/reservagas/service/vaga.service';

@Component({
  selector: 'app-modal-fechar-reserva',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormField, MatLabel, CommonModule, InputtextComponent, ButtonComponent],
  templateUrl: './modal-fechar-reserva.component.html',
  styleUrl: './modal-fechar-reserva.component.css'
})
export class ModalFecharReservaComponent {

  vaga: Vaga = new Vaga();
 
  constructor(
    public dialogRef: MatDialogRef<ModalFecharReservaComponent>,
    private vagaService: VagaService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ 
    this.vaga = data.vaga;
  }

  cancelar() {
    this.dialogRef.close();
  }

}
