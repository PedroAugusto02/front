import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ButtonComponent } from '../../../../../components/buttons/button/button.component';
import { ModalReservaComponent } from '../../../../../components/dialogs/modal-reserva/modal-reserva.component';
import { IconComponent } from '../../../../../components/icon/icon.component';
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
  imports: [
    CommonModule, 
    ButtonComponent,
     InputtextComponent,
     ToggleComponent,
     ColorPickerComponent,
     MatTableModule,
     MatButtonModule,
     MatIconModule,
     MatButton,
     MatButtonToggleModule,
     MatSlideToggle,
     FormsModule,
     IconComponent],
  templateUrl: './reserva-detalhes.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./reserva-detalhes.component.css']
})

export class ReservaDetalhesComponent {

  readonly dialog = inject(MatDialog);
  vaga: Vaga;
  estacionamento: Estacionamento;
  reservas: Reserva[] = [];
  dataSource = this.reservas;
  columnsToDisplay = ['dataHoraReserva', 'dataHoraTermino', 'valor', 'pago'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Reserva | null | undefined;

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
    this.vagaService.buscarReservasPorVaga(vagaId).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (reservas: Reserva[]) => {
        this.reservas = reservas;
        this.dataSource = reservas; // Atualizar dataSource com as reservas recebidas
        console.log(this.dataSource); // Log para verificar os dados recebidos
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

  incluirReservaModal(): void {
    const dialogRef = this.dialog.open(ModalReservaComponent, {
      data: { vaga: this.vaga }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.reservaCriada) {
        this.buscaReservasPorVaga(this.vaga.id); // Atualizar reservas após criar uma nova
      }
    });
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

  // Mapeia os nomes das colunas para títulos amigáveis
  columnHeaders: { [key: string]: string } = {
    dataHoraReserva: 'Data da Reserva',
    dataHoraTermino: 'Hora de Término',
    valor: 'Valor Pago',
    pago: 'Foi Pago?'
  };

  // Verifica se a coluna é do tipo data
  isDateColumn(column: string): boolean {
    return ['dataHoraReserva', 'dataHoraTermino'].includes(column);
  }

  // Retorna o nome amigável da coluna
  getColumnHeader(column: string): string {
    return this.columnHeaders[column] || column;
  }

  onTipoVagaClick(tipo: string) {
    console.log('Tipo de vaga selecionado:', tipo);
    // Aqui você pode realizar ações adicionais, como atualizar variáveis ou chamar serviços
  }  

}
