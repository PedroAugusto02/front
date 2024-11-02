import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'input-email',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.css'
})
export class InputEmailComponent {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() value!: any;
  @Output() valueChange = new EventEmitter<any>();

  emailFormControl = new FormControl('', Validators.email);
  matcher = new MyErrorStateMatcher();

  onInputChange(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
