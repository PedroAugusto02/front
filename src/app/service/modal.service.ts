import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/dialogs/modal/modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  showError(message: string) {
    this.dialog.open(ModalComponent, {
      width: '250px',
      data: { message, type: 'error' }
    });
  }

  showSuccess(message: string) {
    this.dialog.open(ModalComponent, {
      width: '250px',
      data: { message, type: 'success' }
    });
  }

  showWarning(message: string) {
    this.dialog.open(ModalComponent, {
      width: '250px',
      data: { message, type: 'warning' }
    });
  }
}
