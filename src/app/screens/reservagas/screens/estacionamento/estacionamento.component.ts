import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../authentication/auth.service';
import { ButtonComponent } from '../../../../components/buttons/button/button.component';
import { MinibuttonComponent } from '../../../../components/buttons/minibutton/minibutton.component';
import { CheckboxComponent } from '../../../../components/inputs/checkbox/checkbox.component';
import { InputtextComponent } from '../../../../components/inputs/text/inputtext/inputtext.component';
import { Estacionamento } from '../../../../model/Estacionamento';
import { Vaga } from '../../../../model/Vaga';
import { LoaderService } from '../../../../service/loader.service';
import { TitleService } from '../../../../service/title.service';
import { EstacionamentoService } from '../../service/estacionamento.service';

@Component({
  selector: 'app-estacionamento',
  templateUrl: './estacionamento.component.html',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, InputtextComponent, ButtonComponent, MatCardModule, CheckboxComponent, MinibuttonComponent, CdkDropListGroup, CdkDropList, CdkDrag, MatButtonModule, MatDividerModule, MatIconModule],
  styleUrls: ['./estacionamento.component.css']
})
export class EstacionamentoComponent implements OnInit {
  estacionamentos_lista: Estacionamento[] = [];
  estacionamentos_update: Estacionamento[] = [];
  estacionamentoUpdate: Estacionamento = new Estacionamento();
  estacionamentoNovo: Estacionamento = new Estacionamento();
  vagas: Vaga[] = [];

  constructor(
    private authService: AuthService,
    private estacionamentoService: EstacionamentoService,
    private titleService: TitleService,
    private loader: LoaderService,
  ) {
    this.titleService.setPageTitle("Estacionamentos");
  }

  ngOnInit(): void {
    this.carregarEstacionamentos();
  }

  refresh() {
    this.estacionamentoUpdate = new Estacionamento();
    this.estacionamentoNovo = new Estacionamento();
    this.estacionamentos_update = [];
    this.carregarEstacionamentos();
  }

  carregarEstacionamentos(): void {
    this.loader.show();
    const usuario = this.authService.getLoggedInUser();
    if (usuario.role == "DONO") {
      this.estacionamentoService.listarEstacionamentosPorUsuario(usuario.id).pipe(
        finalize(() => {
          this.loader.hide();
        })
      ).subscribe({
        next: (estacionamentos) => {
          this.estacionamentos_lista = estacionamentos;
        },
        error: (error) => {
          console.log('Erro ao carregar estacionamentos:', error);
        },
      });
    } else if (usuario.role == "ADMIN") {
      this.estacionamentoService.listarEstacionamentos().pipe(finalize(() => {
        this.loader.hide();
      })).subscribe({
        next: (estacionamentos) => {
          this.estacionamentos_lista = estacionamentos;
        },
        error: (error) => {
          console.log('Erro ao carregar estacionamentos:', error);
        }
      }
      );
    }
  }


  adicionarEstacionamento(): void {
    this.loader.show();
    this.estacionamentoService.criarEstacionamento(this.estacionamentoNovo).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (novoEstacionamento) => {
        this.estacionamentos_lista.push(novoEstacionamento);
        this.refresh();
      },
      error: (error) => {
        console.log('Erro ao adicionar estacionamento:', error);
      }
    });
  }

  deletarEstacionamento(id: number): void {
    this.loader.show();
    this.estacionamentoService.deletarEstacionamento(id).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: () => {
        this.refresh();
      },
      error: (error) => {
        console.log('Erro ao excluir estacionamento:', error);
      }
    });
  }

  dropUpdate(event: CdkDragDrop<Estacionamento[]>, estacionamento: Estacionamento[]) {
    if (this.estacionamentos_update.length == 0) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.estacionamentoUpdate = estacionamento[0];
  }

  drop(event: CdkDragDrop<Estacionamento[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if (this.estacionamentos_update.length == 0) this.estacionamentoUpdate = new Estacionamento();
  }

  salvarEstacionamento() {
    this.estacionamentoService.atualizarEstacionamento(this.estacionamentoUpdate.id, this.estacionamentoUpdate).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: () => {
        this.refresh();
      },
      error: (error) => {
        console.log('Erro ao salvar estacionamento:', error);
      }
    })
  }
}

