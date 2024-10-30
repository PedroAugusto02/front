import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  styleUrl: './input-telefone.component.css'
})
export class InputTelefoneComponent {

  @Input() label!: string;
  @Input() ddd!: number;
  @Input() placeholder!: string;
  @Input() maximoCaracteres: number = 25;

  telefone: string = '';

  onInputChange(event: Event): void {
    let input = (event.target as HTMLInputElement).value;

    // Remove todos os caracteres que não são números
    input = input.replace(/\D/g, '');

    // Limita o input a 9 dígitos
    if (input.length > 9) {
      input = input.slice(0, 9);
    }

    // Aplica a máscara "99910-4324"
    if (input.length > 5) {
      input = input.slice(0, 5) + '-' + input.slice(5);
    }

    // Atualiza o valor do telefone com a máscara
    this.telefone = input;
  }

}
