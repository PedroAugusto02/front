import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'minibutton',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatTooltip],
  templateUrl: './minibutton.component.html',
  styleUrl: './minibutton.component.css'
})
export class MinibuttonComponent {

  @Input() label!: string;
  @Input() color!: string;
  @Input() icon!: string;
  @Input() title!: string;
  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    // Emitir evento quando o botão é clicado
    this.buttonClick.emit();
  }

}
