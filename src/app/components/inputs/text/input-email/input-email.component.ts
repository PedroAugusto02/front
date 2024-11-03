import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})
export class InputEmailComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  emailFormControl: FormControl;
  matcher = new MyErrorStateMatcher();

  constructor() {
    this.emailFormControl = new FormControl({ value: this.value, disabled: this.disabled }, [
      Validators.required,
      Validators.email,
    ]);
  }

  ngOnInit(): void {
    this.inicializarFormControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.emailFormControl.setValue(this.value, { emitEvent: false });
    }

    if (changes['disabled']) {
      if (this.disabled) {
        this.emailFormControl.disable({ emitEvent: false });
      } else {
        this.emailFormControl.enable({ emitEvent: false });
      }
    }
  }

  private inicializarFormControl(): void {
    this.emailFormControl.valueChanges.subscribe((newValue: string) => {
      this.valueChange.emit(newValue);
    });
  }
}
