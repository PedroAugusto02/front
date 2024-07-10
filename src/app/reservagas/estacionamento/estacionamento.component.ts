import { Component, OnInit } from '@angular/core';
import { Estacionamento } from '../../entity/Estacionamento';
import { Vaga } from '../../entity/Vaga';
import { VagaService } from '../service/vaga.service';
import { TitleService } from '../../service/title.service';
import { EstacionamentoService } from '../service/estacionamento.service';
import { InputtextComponent } from '../../components/inputs/inputtext/inputtext.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CheckboxComponent } from '../../components/inputs/checkbox/checkbox.component';
import { MinibuttonComponent } from '../../components/buttons/minibutton/minibutton.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


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

  constructor(
    private estacionamentoService: EstacionamentoService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.carregarEstacionamentos();
    setTimeout(() => {
      this.titleService.setPageTitle("Estacionamentos");
    }, 10);
  }

  refresh() {
    this.estacionamentoUpdate = new Estacionamento();
    this.estacionamentoNovo = new Estacionamento();
    this.estacionamentos_update = [];
    this.carregarEstacionamentos();
  }

  carregarEstacionamentos(): void {
    this.estacionamentoService.listarEstacionamentos().subscribe(
      estacionamentos => {
        this.estacionamentos_lista = estacionamentos;
      },
      error => {
        console.log('Erro ao carregar estacionamentos:', error);
      }
    );
  }

  adicionarEstacionamento(): void {
    this.estacionamentoService.criarEstacionamento(this.estacionamentoNovo).subscribe(
      novoEstacionamento => {
        this.estacionamentos_lista.push(novoEstacionamento);
        this.refresh();
      },
      error => {
        console.log('Erro ao adicionar estacionamento:', error);
      }
    );
  }

  deletarEstacionamento(id: number): void {
    this.estacionamentoService.deletarEstacionamento(id).subscribe(
      () => {
        this.refresh();
      },
      error => {
        console.log('Erro ao excluir estacionamento:', error);
      }
    );
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
    this.estacionamentoService.atualizarEstacionamento(this.estacionamentoUpdate.id, this.estacionamentoUpdate).subscribe(
      () => {
        this.refresh();
      },
      error => {
        console.log('Erro ao salvar estacionamento:', error);
      }
    )
  }
}

