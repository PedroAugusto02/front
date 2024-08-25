import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  private openToast(type: string, message: string, title: string, duration: number = 5000) {
    this.snackBar.openFromComponent(ToastComponent, {
      duration: duration,
      data: { type, message, title },
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snack-bar'],
      announcementMessage: 'Q',
    });
  }
  
  success(message: string, title: string, options: any = {}) {
    this.openToast('success', message, title, options.duration);
  }

  warn(message: string, title: string, options: any = {}) {
    this.openToast('warn', message, title, options.duration);
  }

  danger(message: string, title: string, options: any = {}) {
    this.openToast('danger', message, title, options.duration);
  }

}
