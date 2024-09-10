import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ButtonComponent } from '../../../../../components/buttons/button/button.component';
import { ModalReservaComponent } from '../../../../../components/dialogs/modal-reserva/modal-reserva.component';
import { ColorPickerComponent } from '../../../../../components/inputs/color-picker/color-picker.component';
import { InputtextComponent } from '../../../../../components/inputs/inputtext/inputtext.component';
import { ToggleComponent } from '../../../../../components/inputs/toggle/toggle.component';
import { Estacionamento } from '../../../../../model/Estacionamento';
import { Reserva } from '../../../../../model/Reserva';
import { Vaga } from '../../../../../model/Vaga';
import { LoaderService } from '../../../../../service/loader.service';
import { EstacionamentoService } from '../../../service/estacionamento.service';
import { ReservaService } from '../../../service/reserva.service';
import { VagaService } from '../../../service/vaga.service';

@Component({
  selector: 'app-reserva-detalhes',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputtextComponent, ToggleComponent, ColorPickerComponent, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './reserva-detalhes.component.html',
  styleUrl: './reserva-detalhes.component.css'
})
export class ReservaDetalhesComponent {

  vaga: Vaga;
  estacionamento: Estacionamento;
  reservas: Reserva[] = []; // Lista de reservas
  expandedElement!: Reserva | null;
  columnsToDisplayWithExpand = ['cliente', 'dataHoraReserva', 'dataHoraTermino', 'valor', 'expand'];
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private estacionamentoService: EstacionamentoService,
    private vagaService: VagaService,
    private reservaService: ReservaService,
    private loader: LoaderService,
  ) {
    this.vaga = new Vaga();
    this.estacionamento = new Estacionamento();
  }

  ngOnInit(): void {
    this.vaga = history.state.vaga;
    this.buscaEstacionamento(this.vaga.estacionamento.id);
    this.buscaReservasPorVaga(this.vaga.id); // Buscar as reservas associadas à vaga
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

  buscaReservasPorVaga(vagaId: number): void {
    this.loader.show();
    this.reservaService.obterReservasPorVaga(vagaId).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (reservas: Reserva[]) => {
        this.reservas = reservas;
      },
      error: (error) => {
        console.log('Erro ao buscar reservas:', error);
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
    this.loader.show();
    this.vagaService.atualizarVaga(this.vaga).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: () => {
        this.router.navigate(['/vagas'], { state: { reload: true } });
      },
      error: (error) => {
        console.log('Erro ao salvar a vaga:', error);
      }
    });
  }

  incluirReservaModal(): void {
    const dialogRef = this.dialog.open(ModalReservaComponent, {
      data: { vaga: this.vaga }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.reservaCriada) {
        this.buscaEstacionamento(this.vaga.estacionamento.id);
      }
    });
  }

}
