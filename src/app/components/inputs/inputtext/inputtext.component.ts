import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'inputtext',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './inputtext.component.html',
  styleUrl: './inputtext.component.css'
})
export class InputtextComponent {

  @Input() label!: string;
  @Input() value!: any;
  @Input() placeholder!: string;
  @Output() valueChange = new EventEmitter<any>();

  onInputChange(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

}
