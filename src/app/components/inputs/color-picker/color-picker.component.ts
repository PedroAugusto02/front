import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'color-picker',
  standalone: true,
  imports: [ColorPickerModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {

  @Input() color!: string;
  @Output() colorChange = new EventEmitter<string>();

  onColorChange(newColor: string) {
    this.color = newColor;
    this.colorChange.emit(this.color);
  }
}
