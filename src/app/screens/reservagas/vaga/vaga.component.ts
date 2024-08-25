import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';



import { TitleService } from '../../../service/title.service';
import { EstacionamentoService } from '../service/estacionamento.service';
import { VagaService } from '../service/vaga.service';
import { LoaderService } from '../../../service/loader.service';
import { Vaga } from '../../../entity/Vaga';
import { InputtextComponent } from '../../../components/inputs/inputtext/inputtext.component';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { CheckboxComponent } from '../../../components/inputs/checkbox/checkbox.component';
import { InputSelectComponent } from '../../../components/inputs/inputselect/inputselect.component';
import { Estacionamento } from '../../../entity/Estacionamento';
import { AuthService } from '../../../authentication/auth.service';
import { MinibuttonComponent } from "../../../components/buttons/minibutton/minibutton.component";
import { ToastService } from '../../../service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservaComponent } from '../../../components/dialogs/modal-reserva/modal-reserva.component';


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

export class VagaComponent implements AfterViewInit {
  estacionamentos: Estacionamento[] = [];
  selectedEstacionamentoId: number | null = null;
  cardsVagas: Vaga[] = [];

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
        console.log('Vagas carregadas:', this.cardsVagas);
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

  readonly dialog = inject(MatDialog);

  openModal(vaga: Vaga): void {
    this.dialog.open(ModalReservaComponent, {
      data: { vaga: vaga }
    });
  }

}
