import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarModule, MatSnackBarRef, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, CommonModule
  ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<ToastComponent>
  ) {}

  getTitleClass(): string {
    return `toast-title-${this.data.type}`;
  }

}


