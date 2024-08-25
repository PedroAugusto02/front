import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-number',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'] // Corrigido de styleUrl para styleUrls
})
export class InputNumberComponent implements OnInit, OnChanges {
  @Input() label!: string;
  @Input() value: number = 0;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() validacao: boolean = false;
  @Input() class: string = '';
  @Output() valueChange = new EventEmitter<number>();

  campoFormControl!: FormControl;

  ngOnInit(): void {
    this.campoFormControl = new FormControl({ value: this.formatValue(this.value), disabled: this.disabled });

    if (this.validacao) {
      this.campoFormControl.setValidators([Validators.required]);
    }

    this.campoFormControl.valueChanges.subscribe(newValue => {
      this.valueChange.emit(this.parseValue(newValue));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.campoFormControl.setValue(this.formatValue(this.value), { emitEvent: false });
    }

    if (changes['disabled']) {
      if (this.disabled) {
        this.campoFormControl.disable();
      } else {
        this.campoFormControl.enable();
      }
    }
  }

  onBlur(): void {
    this.campoFormControl.setValue(this.formatValue(this.parseValue(this.campoFormControl.value)), { emitEvent: false });
  }

  private formatValue(value: number): string {
    return value.toFixed(2); // Formata o valor com duas casas decimais
  }

  private parseValue(value: string): number {
    return parseFloat(value.replace('R$', '').replace(',', '.').trim());
  }
}
