import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'inputtext',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.css']
})
export class InputtextComponent implements OnInit {
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
}
