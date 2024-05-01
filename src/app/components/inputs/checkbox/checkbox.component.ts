import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'checkbox',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {

  @Input() label!: string;
  @Input() value!: boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  constructor() { }

  onCheckboxChange(checked: boolean) {
    this.value = checked;
    this.valueChange.emit(this.value);
  }


}
