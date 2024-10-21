import { Component, EventEmitter, Input, forwardRef, OnChanges, SimpleChanges, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-inputselect',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './inputselect.component.html',
  styleUrls: ['./inputselect.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSelectComponent),
    multi: true
  }]
})
export class InputSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() lista!: any[];
  @Input() atributoExibido!: string;
  @Input() atributoValor!: string;
  @Input() label!: string;
  @Input() value: any; // Certifique-se de que a propriedade 'value' tenha o decorator @Input()

  @Output() valueChange = new EventEmitter<any>();

  campoFormControl = new FormControl();

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.campoFormControl.setValue(this.value, { emitEvent: false });
    }
    if (changes['lista']) {
      // Se a lista mudar, talvez você queira definir o valor do campo novamente
      this.campoFormControl.setValue(this.value, { emitEvent: false });
    }
  }
  
  
  writeValue(value: any): void {
    this.value = value;
    if (value !== null && value !== undefined) {
      this.campoFormControl.setValue(value, { emitEvent: false });
    } else {
      this.campoFormControl.setValue(null, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.campoFormControl.valueChanges.subscribe(val => {
      this.value = val;
      this.onChange(val);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.campoFormControl.disable();
    } else {
      this.campoFormControl.enable();
    }
  }

  onSelectionChange(event: MatSelectChange): void {
    const valor = event.value;
    this.valueChange.emit(valor);
  }
  
  
  
  
}
