import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../authentication/auth.service';
import { ButtonComponent } from '../../../../components/buttons/button/button.component';
import { MinibuttonComponent } from '../../../../components/buttons/minibutton/minibutton.component';
import { ModalConfirmaComponent } from '../../../../components/dialogs/modal-confirma/modal-confirma.component';
import { ModalFecharReservaComponent } from '../../../../components/dialogs/modal-fechar-reserva/modal-fechar-reserva.component';
import { ModalReservaDetalhadaComponent } from '../../../../components/dialogs/modal-reserva-detalhada/modal-reserva-detalhada.component';
import { ModalReservaComponent } from '../../../../components/dialogs/modal-reserva/modal-reserva.component';
import { CheckboxComponent } from '../../../../components/inputs/checkbox/checkbox.component';
import { InputSelectComponent } from '../../../../components/inputs/inputselect/inputselect.component';
import { InputtextComponent } from '../../../../components/inputs/inputtext/inputtext.component';
import { Estacionamento } from '../../../../model/Estacionamento';
import { Vaga } from '../../../../model/Vaga';
import { LoaderService } from '../../../../service/loader.service';
import { TitleService } from '../../../../service/title.service';
import { EstacionamentoService } from '../../service/estacionamento.service';
import { VagaService } from '../../service/vaga.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    InputSelectComponent, 
    FormsModule, 
    MinibuttonComponent,
    MatIcon,
    MatButtonModule,
    ToastrModule],
  styleUrls: ['./vaga.component.css']
})

export class VagaComponent implements AfterViewInit, OnDestroy {

  estacionamentos: Estacionamento[] = [];
  selectedEstacionamentoId: number = 0;
  cardsVagas: Vaga[] = [];
  intervalId: any;
  isMinimized = false;
  readonly dialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private vagaService: VagaService,
    private estacionamentoService: EstacionamentoService,
    private router: Router,
    private titleService: TitleService,
    private loader: LoaderService,
    private toast: ToastrService,
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

        if (!ultimaReserva.pago) {
          const tempoEntrada = new Date(ultimaReserva.dataHoraReserva).getTime();
          const diferenca = agora - tempoEntrada;
          vaga.tempoDecorrido = this.formatarTempo(diferenca);
        }
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

  incluirReservaModal(vaga: Vaga): void {
    if (vaga.tipoDeVaga.codigo === 'ROT') {
      const dialogRef = this.dialog.open(ModalReservaComponent, {
        data: { vaga: vaga }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result?.reservaCriada) {
          this.toast.success('Reserva criada com sucesso!', 'Sucesso',{titleClass:'tituloToast',progressBar:true});
          this.carregarVagas(this.selectedEstacionamentoId);
        }
      });
    } else if (vaga.tipoDeVaga.codigo === 'RES') {
      const dialogRef = this.dialog.open(ModalReservaDetalhadaComponent, {
        data: { vaga: vaga }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result?.reservaCriada) {
          this.toast.success('Reserva criada com sucesso!', 'Sucesso',{titleClass:'tituloToast',progressBar:true});
          this.carregarVagas(this.selectedEstacionamentoId);
        }
      });
    } else if (vaga.tipoDeVaga.codigo === 'MEN') {
      this.toast.warning('Essa vaga é mensalista e não aceita reservas avulsas.', 'Atenção',{titleClass:'tituloToast',progressBar:true});
    }
  }

  fecharReservaModal(vaga: Vaga) {
    const dialogRef = this.dialog.open(ModalConfirmaComponent, {
      data: { pergunta: 'Deseja realmente fechar a reserva?' }
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        if(vaga.reservas){

          const ultimaReserva = vaga.reservas.reduce((prev, current) => {
            return new Date(prev.dataHoraReserva).getTime() > new Date(current.dataHoraReserva).getTime() ? prev : current;
          });
       
          this.dialog.open(ModalFecharReservaComponent, {
            data: { vaga: vaga, reserva: ultimaReserva } // Passe a última reserva aqui
          });
        }
      }
    });
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }
  
}
