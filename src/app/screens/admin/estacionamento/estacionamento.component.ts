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
import { InputtextComponent } from '../../../components/inputs/text/inputtext/inputtext.component';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { CheckboxComponent } from '../../../components/inputs/checkbox/checkbox.component';
import { MinibuttonComponent } from '../../../components/buttons/minibutton/minibutton.component';
import { Estacionamento } from '../../../model/Estacionamento';
import { AuthService } from '../../../authentication/auth.service';
import { EstacionamentoService } from '../../reservagas/service/estacionamento.service';
import { TitleService } from '../../../service/title.service';
import { LoaderService } from '../../../service/loader.service';
import { Vaga } from '../../../model/Vaga';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { Title } from '@angular/platform-browser';
import { Usuario } from '../../../model/Usuario';


@Component({
  selector: 'app-estacionamento',
  templateUrl: './estacionamento.component.html',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, InputtextComponent, ButtonComponent, MatCardModule, CheckboxComponent, MinibuttonComponent, CdkDropListGroup, CdkDropList, CdkDrag, MatButtonModule, MatDividerModule, MatIconModule],
  styleUrls: ['./estacionamento.component.css']
})
export class EstacionamentoComponent implements OnInit {
  estacionamentos_lista: Estacionamento[] = [];
  usuariosVinculados: Usuario[] = [];
  estacionamentoNovo: Estacionamento = new Estacionamento();

  constructor(
    private estacionamentoService: EstacionamentoService,
    private usuarioService: UsuarioService,
    private loader: LoaderService,
    private title: TitleService,
  ) {
    this.title.setPageTitle("Estacionamentos Vinculados");
  }

  ngOnInit(): void {
    this.carregarEstacionamentos();
    this.carregarUsuariosVinculados();
  }

  carregarEstacionamentos(): void {
    this.estacionamentoService.listarEstacionamentos().subscribe({
      next: (estacionamentos) => {
        this.estacionamentos_lista = estacionamentos;
      },
      error: (error) => console.error('Erro ao carregar estacionamentos:', error)
    });
  }

  carregarUsuariosVinculados(): void {
      this.loader.show();
      this.usuarioService.listarUsuarios().pipe(finalize(() => {
        this.loader.hide();
      })).subscribe({
        next: (usuarios) => {
          this.usuariosVinculados = usuarios;
        },
        error: (error) => {
          console.log('Erro ao carregar usuários:', error);
        }
      });
    
  }

  adicionarEstacionamento(): void {
    this.estacionamentoService.criarEstacionamento(this.estacionamentoNovo).subscribe({
      next: (novoEstacionamento) => {
        this.estacionamentos_lista.push(novoEstacionamento);
      },
      error: (error) => console.error('Erro ao adicionar estacionamento:', error)
    });
  }

  abrirModalVinculo(estacionamentoId: number): void {
    // Função para abrir modal de vínculo
    console.log('Abrir modal para vincular usuário ao estacionamento ID:', estacionamentoId);
  }

  getColor(index: number): string {
    const colors = ["#007bff", "#28a745", "#ffc107", "#17a2b8", "#6f42c1"];
    return colors[index % colors.length];
  }

  getColorForEstacionamento(estacionamentoId: number): string {
    const estacionamentoIndex = this.estacionamentos_lista.findIndex(est => est.id === estacionamentoId);
    return this.getColor(estacionamentoIndex);
  }
}

