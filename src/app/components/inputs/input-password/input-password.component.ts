import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-password',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css'
})
export class InputPasswordComponent {
  @Input() label!: string;
  @Input() value!: any;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() validacao: boolean = false;
  @Output() valueChange = new EventEmitter<any>();

  campoFormControl!: FormControl;

  ngOnInit(): void {
    // Initialize the FormControl with the value and disabled status
    this.campoFormControl = new FormControl({
      value: this.value,
      disabled: this.disabled
    });

    if (this.validacao) {
      this.campoFormControl.setValidators([Validators.required]);
    }

    // Emit value change when form control value changes
    this.campoFormControl.valueChanges.subscribe(newValue => {
      this.valueChange.emit(newValue);
    });
  }

  onInputChange(event: any) {
    const newValue = event.target.value;
    this.campoFormControl.setValue(newValue, { emitEvent: false });
    this.valueChange.emit(newValue);
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
