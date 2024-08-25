import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-number-valor',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-number-valor.component.html',
  styleUrls: ['./input-number-valor.component.css'] // Corrigido de styleUrl para styleUrls
})
export class InputNumberValorComponent implements OnInit, OnChanges {
  @Input() label!: string;
  @Input() value: number = 0;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() validacao: boolean = false;
  @Input() class: string = '';
  @Output() valueChange = new EventEmitter<number>();

  campoFormControl!: FormControl;

  ngOnInit(): void {
    this.campoFormControl = new FormControl({
      value: this.formatValue(this.value),
      disabled: this.disabled
    });
  
    if (this.validacao) {
      this.campoFormControl.setValidators([Validators.required]);
    }
  
    this.campoFormControl.valueChanges.subscribe(newValue => {
      console.log('Campo ValueChanges:', newValue);
      this.valueChange.emit(this.parseValue(newValue));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      console.log('Campo ngOnChanges Value:', this.value);
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
    const rawValue = this.campoFormControl.value;
    // Certifique-se de que o valor seja convertido corretamente
    const parsedValue = this.parseValue(rawValue);
    this.campoFormControl.setValue(this.formatValue(parsedValue), { emitEvent: false });
  }
  

  private formatValue(value: number): string {
    // Retorna o valor formatado com ponto como separador decimal
    return value.toFixed(2);
  }
  
  private parseValue(value: any): number {
    if (typeof value === 'string') {
      // Substitui vírgula por ponto e converte para número
      return parseFloat(value.replace(',', '.').trim());
    }
    return value; // Se já for um número, retorna diretamente
  }

}
