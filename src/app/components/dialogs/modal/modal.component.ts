import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle, MatDialogClose, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, type: string }
  ) {}

  getTitle(): string {
    switch (this.data.type) {
      case 'success': return 'Sucesso';
      case 'warning': return 'Atenção';
      case 'error': return 'Erro';
      default: return '';
    }
  }

  getColor(): string {
    switch (this.data.type) {
      case 'success': return 'green';
      case 'warning': return 'orange';
      case 'error': return 'red';
      default: return '';
    }
  }
}
