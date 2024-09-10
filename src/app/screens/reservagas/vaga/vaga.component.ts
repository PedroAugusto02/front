import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../authentication/auth.service';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { MinibuttonComponent } from "../../../components/buttons/minibutton/minibutton.component";
import { ModalReservaComponent } from '../../../components/dialogs/modal-reserva/modal-reserva.component';
import { CheckboxComponent } from '../../../components/inputs/checkbox/checkbox.component';
import { InputSelectComponent } from '../../../components/inputs/inputselect/inputselect.component';
import { InputtextComponent } from '../../../components/inputs/inputtext/inputtext.component';
import { Estacionamento } from '../../../entity/Estacionamento';
import { Vaga } from '../../../entity/Vaga';
import { LoaderService } from '../../../service/loader.service';
import { TitleService } from '../../../service/title.service';
import { ToastService } from '../../../service/toast.service';
import { EstacionamentoService } from '../service/estacionamento.service';
import { VagaService } from '../service/vaga.service';
import { ModalFecharReservaComponent } from '../../../components/dialogs/modal-fechar-reserva/modal-fechar-reserva.component';
import { ModalConfirmaComponent } from '../../../components/dialogs/modal-confirma/modal-confirma.component';

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  standalone: true,
  imports: [
    InputtextComponent, 
    ButtonComponent, 
    CheckboxComponent, 
    CdkDropListGroup, 
    CdkDropList, 
    CdkDrag, 
    CommonModule, 
    InputSelectComponent, FormsModule, MinibuttonComponent],
  styleUrls: ['./vaga.component.css']
})

export class VagaComponent implements AfterViewInit, OnDestroy {
  
  estacionamentos: Estacionamento[] = [];
  selectedEstacionamentoId: number = 0;
  cardsVagas: Vaga[] = [];
  intervalId: any;
  readonly dialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private vagaService: VagaService,
    private estacionamentoService: EstacionamentoService,
    private router: Router,
    private titleService: TitleService,
    private loader: LoaderService,
    private toast: ToastService,
  ) {
    this.titleService.setPageTitle("Vagas");
  }

  ngAfterViewInit(): void {
    this.carregarEstacionamentosEVagas();
    this.startCronometro();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCronometro(): void {
    this.intervalId = setInterval(() => {
      this.atualizarTempoDecorrido();
    }, 1000);
  }

  atualizarTempoDecorrido(): void {
    const agora = new Date().getTime();
    this.cardsVagas.forEach(vaga => {
      if (!vaga.disponivel && vaga.reservas && vaga.reservas.length > 0) {
        const ultimaReserva = vaga.reservas.reduce((prev, current) => {
          return new Date(prev.dataHoraReserva).getTime() > new Date(current.dataHoraReserva).getTime() ? prev : current;
        });

        const tempoEntrada = new Date(ultimaReserva.dataHoraReserva).getTime();
        const diferenca = agora - tempoEntrada;

        vaga.tempoDecorrido = this.formatarTempo(diferenca);
      }
    });
  }
  

  formatarTempo(ms: number): string {
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${this.pad(horas)}:${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  async carregarEstacionamentosEVagas() {
    await this.carregarEstacionamentos();
    this.selecionarEstacionamento(this.estacionamentos[0].id);
  }

  async carregarEstacionamentos(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.loader.show();
      await this.authService.fetchLoggedInUser();
      const usuario = this.authService.getLoggedInUser();
      if (usuario.role == "DONO") {
        this.estacionamentoService.listarEstacionamentosPorUsuario(usuario.id).pipe(
          finalize(() => {
            this.loader.hide();
          })
        ).subscribe({
          next: (estacionamentos) => {
            this.estacionamentos = estacionamentos;
            resolve();
          },
          error: (error) => {
            console.log('Erro ao carregar estacionamentos:', error);
            reject();
          },
        });
      } else if (usuario.role == "ADMIN") {
        this.estacionamentoService.listarEstacionamentos().pipe(finalize(() => {
          this.loader.hide();
        })).subscribe({
          next: (estacionamentos) => {
            this.estacionamentos = estacionamentos;
            resolve();
          },
          error: (error) => {
            console.log('Erro ao carregar estacionamentos:', error);
            reject();
          }
        }
        );
      }
    })
  }

  // Método alterado para capturar a mudança do estacionamento
  selecionarEstacionamento(id: number): void {
    this.selectedEstacionamentoId = id;
    this.carregarVagas(id);
  }

  carregarVagas(estacionamentoId: number): void {
    this.loader.show();
    this.vagaService.listarVagasPorEstacionamento(estacionamentoId).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (result) => {
        this.cardsVagas = result;
      },
      error: (error) => {
        console.log('Erro ao carregar vagas:', error);
      }
    });
  }

  abrirDetalhesReserva(vaga: Vaga): void {
    this.router.navigate([`/reserva-detalhes`], { state: { vaga } });
  }

  incluirReserva() {
    this.toast.success('This is a success message!', 'Success');
  }

  incluirReservaModal(vaga: Vaga): void {
    const dialogRef = this.dialog.open(ModalReservaComponent, {
      data: { vaga: vaga }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.reservaCriada) {
        this.carregarVagas(this.selectedEstacionamentoId);
      }
    });
  }

  fecharReservaModal(vaga: Vaga) {
    const dialogRef = this.dialog.open(ModalConfirmaComponent, {
      data: { pergunta: 'Deseja realmente fechar a reserva?' }
    });
    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.dialog.open(ModalFecharReservaComponent, {
          data: { vaga: vaga }
        });
      }
    });
  }
  
}
