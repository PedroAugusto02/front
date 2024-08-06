import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-inputselect',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './inputselect.component.html',
  styleUrls: ['./inputselect.component.css']
})
export class InputselectComponent implements OnChanges {
  @Input() lista!: any[];
  @Input() atributoExibido!: string;
  @Input() atributoValor!: string;
  @Input() value: any;
  @Input() label!: string;
  @Output() valueChange = new EventEmitter<any>();

  campoFormControl = new FormControl();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.campoFormControl.setValue(this.value, { emitEvent: false });
    }
    if (changes['lista']) {
      this.campoFormControl.setValue(this.value, { emitEvent: false });
    }
  }

  onSelectionChange(event: any) {
    this.valueChange.emit(event.value);
  }
}