import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './input-telefone.component.html',
  styleUrl: './input-telefone.component.css'
})
export class InputTelefoneComponent {

  @Input() label!: string;
  @Input() ddd!: number;
  @Input() placeholder!: string;

}
