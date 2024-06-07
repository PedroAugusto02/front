import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'card',
  standalone: true,
  imports: [MatCardModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  encapsulation: ViewEncapsulation.None // Desativa o encapsulamento de estilos
})
export class CardComponent {

  @Input() routerLink!: string[];

}
