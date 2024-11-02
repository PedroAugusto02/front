import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'inputtext',
  encapsulation: ViewEncapsulation.None,
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
  @Input() maximoCaracteres: number = 25;
  @Input() class: string = '';
  @Input() apenasNumeros: boolean = false;  // Novo Input para apenas números
  @Output() valueChange = new EventEmitter<any>();

  campoFormControl!: FormControl;

  ngOnInit(): void {
    this.inicializarFormControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      if (this.campoFormControl) {
        this.campoFormControl.setValue(this.value, { emitEvent: false });
      } else {
        console.warn('campoFormControl não está definido ao tentar setar o valor.');
      }
    }

    if (changes['disabled']) {
      if (this.disabled) {
        this.campoFormControl?.disable({ emitEvent: false });
      } else {
        this.campoFormControl?.enable({ emitEvent: false });
      }
    }

    // Reaplica a validação quando `apenasNumeros` muda
    if (this.apenasNumeros) {
      this.atualizarValidacaoApenasNumeros();
    }
  }


  private inicializarFormControl(): void {
    this.campoFormControl = new FormControl({ value: this.value, disabled: this.disabled });

    if (this.validacao) {
      this.campoFormControl.addValidators(Validators.required);
    }

    // Configura a validação inicial para `apenasNumeros`
    this.atualizarValidacaoApenasNumeros();

    // Emite o valor atualizado ao ocorrer mudanças no campo
    this.campoFormControl.valueChanges.subscribe(newValue => {
      // Se apenasNumeros for true, filtra os caracteres não numéricos
      if (this.apenasNumeros) {
        const numericValue = newValue.replace(/\D/g, '');  // Remove caracteres não numéricos
        if (newValue !== numericValue) {
          this.campoFormControl.setValue(numericValue, { emitEvent: false });  // Atualiza o campo sem disparar novo evento
        }
      }
      this.valueChange.emit(newValue);
    });
  }

  private atualizarValidacaoApenasNumeros(): void {
    if (!this.campoFormControl) {
      console.warn('campoFormControl não está definido.');
      return;
    }

    if (this.apenasNumeros) {
      // Adiciona a validação de apenas números
      this.campoFormControl.addValidators(Validators.pattern(/^\d*$/));
    } else {
      // Remove a validação de apenas números se `apenasNumeros` for false
      this.campoFormControl.removeValidators(Validators.pattern(/^\d*$/));
    }

    // Revalida o campo após a mudança
    this.campoFormControl.updateValueAndValidity();
  }

}
