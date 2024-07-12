import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-inputselect',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './inputselect.component.html',
  styleUrls: ['./inputselect.component.css']
})
export class InputselectComponent {
  @Input() lista!: any[];
  @Input() atributoExibido!: string;
  @Input() atributoValor!: string;
  @Input() value: any;
  @Input() label!: string;
  @Output() valueChange = new EventEmitter<any>();

  onSelectionChange(event: any) {
    this.valueChange.emit(event.value);
  }
}
