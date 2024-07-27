import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from '../../../entity/Vaga';
import { Reserva } from '../../../entity/Reserva';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { InputtextComponent } from "../../../components/inputs/inputtext/inputtext.component";
import { ToggleComponent } from '../../../components/inputs/toggle/toggle.component';
import { Estacionamento } from '../../../entity/Estacionamento';
import { EstacionamentoService } from '../../service/estacionamento.service';
import { ColorPickerComponent } from "../../../components/inputs/color-picker/color-picker.component";
import { VagaService } from '../../service/vaga.service';
import { LoaderService } from '../../../service/loader.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-reserva-detalhes',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputtextComponent, ToggleComponent, ColorPickerComponent],
  templateUrl: './reserva-detalhes.component.html',
  styleUrl: './reserva-detalhes.component.css'
})
export class ReservaDetalhesComponent {

  vaga: Vaga;
  estacionamento: Estacionamento;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estacionamentoService: EstacionamentoService,
    private vagaService: VagaService,
    private loader: LoaderService,
  ) {
    this.vaga = new Vaga();
    this.estacionamento = new Estacionamento();
  }

  ngOnInit(): void {
    if (history.state && history.state.vaga) {
      this.vaga = history.state.vaga;
      this.buscaEstacionamento(this.vaga.estacionamento.id);
      console.log('Vaga detalhada:', this.vaga);
    } else {
      // Lógica de tratamento caso não haja state.vaga definido
    }
  }
  

  buscaEstacionamento(estacionamentoId: number): void {
    this.loader.show();
    this.estacionamentoService.buscarEstacionamentoPorId(estacionamentoId).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (estacionamento) => {
        this.estacionamento = estacionamento;
      },
      error: (error) => {
        console.log('Erro ao buscar estacionamento:', error);
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/vagas']);
  }

  onColorPickerChange(newColor: string) {
    this.vaga.cor = newColor;
  }
  
  onDisponivelChange(checked: boolean): void {
    this.vaga.disponivel = checked;
  }

  salvarVaga(): void {
    this.vagaService.atualizarVaga(this.vaga).subscribe({
      next: () => {
        this.router.navigate(['/vagas'], { state: { reload: true } });
      },
      error: (error) => {
        console.log('Erro ao salvar a vaga:', error);
      }
    });
  }

}
