import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'app-modal-confirma',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormField, MatLabel, CommonModule, ButtonComponent],
  templateUrl: './modal-confirma.component.html',
  styleUrl: './modal-confirma.component.css'
})
export class ModalConfirmaComponent {

  @Output() resposta = new EventEmitter<boolean>(); 
  
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pergunta: string } // Injetando os dados corretamente
  ){ }

  confirmar() {
    this.dialogRef.close(true); // Passa true quando o usuário confirmar
  }

  cancelar() {
    this.dialogRef.close(false); // Passa false quando o usuário cancelar
  }

}
