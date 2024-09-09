import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'inputtext',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.css']
})
export class InputtextComponent implements OnInit, OnChanges {
  @Input() label!: string;
  @Input() value: any = '';  
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() validacao: boolean = false;
  @Input() class: string = '';
  @Output() valueChange = new EventEmitter<any>();

  campoFormControl!: FormControl;

  ngOnInit(): void {
    // Inicialize o FormControl com o valor e o status de desabilitado
    this.campoFormControl = new FormControl({ value: this.value, disabled: this.disabled });
  
    if (this.validacao) {
      this.campoFormControl.setValidators([Validators.required]);
    }
  
    // Emite a mudança de valor quando o FormControl muda
    this.campoFormControl.valueChanges.subscribe(newValue => {
      this.valueChange.emit(newValue);
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.campoFormControl.setValue(this.value, { emitEvent: false });
    }
  
    if (changes['disabled']) {
      if (this.disabled) {
        this.campoFormControl.disable({ emitEvent: false });
      } else {
        this.campoFormControl.enable({ emitEvent: false });
      }
    }
  }
  
}
