import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from '../../../entity/Vaga';
import { Reserva } from '../../../entity/Reserva';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { InputtextComponent } from "../../../components/inputs/inputtext/inputtext.component";
import { ToggleComponent } from '../../../components/toggle/toggle.component';


@Component({
  selector: 'app-reserva-detalhes',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputtextComponent,ToggleComponent],
  templateUrl: './reserva-detalhes.component.html',
  styleUrl: './reserva-detalhes.component.css'
})
export class ReservaDetalhesComponent {

  vaga: Vaga | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.vaga = history.state.vaga;
    console.log('Vaga detalhada:', this.vaga);
  }

  voltar(): void {
    // Navega de volta à página anterior
    this.router.navigate(['/vagas']);
  }
}
