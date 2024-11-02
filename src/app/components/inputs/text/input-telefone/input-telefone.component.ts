import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-telefone',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule, 
    CommonModule,
  ],
  templateUrl: './input-telefone.component.html',
  styleUrls: ['./input-telefone.component.css']
})
export class InputTelefoneComponent implements OnInit {

  @Input() value: string = '';  
  @Input() label!: string;
  @Input() ddd!: number;
  @Input() placeholder!: string;
  @Input() maximoCaracteres: number = 10;
  @Output() valueChange = new EventEmitter<string>();

  campoFormControl!: FormControl;

  ngOnInit(): void {
    this.inicializarFormControl();
  }

  private inicializarFormControl(): void {
    this.campoFormControl = new FormControl(this.value);
    
    // Emite o valor atualizado ao ocorrer mudanças no campo
    this.campoFormControl.valueChanges.subscribe(newValue => {
      const numericValue = newValue.replace(/\D/g, '');  // Remove caracteres não numéricos
      
      // Aplica a máscara ao valor numérico
      const maskedValue = this.aplicarMascara(numericValue);
      
      // Atualiza o campo e emite o novo valor com a máscara
      this.campoFormControl.setValue(maskedValue, { emitEvent: false });
      this.valueChange.emit(maskedValue);
    });
  }

  private aplicarMascara(value: string): string {
    // Limita o input a 10 dígitos
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Aplica a máscara "99910-4324"
    if (value.length > 5) {
      return value.slice(0, 5) + '-' + value.slice(5); // Insere o "-" após 5 dígitos
    }

    return value; // Retorna o valor sem máscara se não houver 5 dígitos
  }
}
