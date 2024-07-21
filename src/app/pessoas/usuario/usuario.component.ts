import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { UsuarioService } from './service/usuario.service';
import { InputtextComponent } from '../../components/inputs/inputtext/inputtext.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { CheckboxComponent } from '../../components/inputs/checkbox/checkbox.component';
import { MinibuttonComponent } from '../../components/buttons/minibutton/minibutton.component';
import { Usuario } from '../../entity/Usuario';
import { TitleService } from '../../service/title.service';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, InputtextComponent, ButtonComponent, MatCardModule, CheckboxComponent, MinibuttonComponent, CdkDropListGroup, CdkDropList, CdkDrag, MatButtonModule, MatDividerModule, MatIconModule, InputEmailComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  usuarios_lista: Usuario[] = [];
  usuarios_update: Usuario[] = [];
  usuarioUpdate: Usuario = new Usuario();
  usuarioNovo: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private titleService: TitleService,
  ) {
    this.titleService.setPageTitle("Usuarios");
  }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  refresh() {
    this.usuarioUpdate = new Usuario();
    this.usuarioNovo = new Usuario();
    this.usuarios_update = [];
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      usuarios => {
        this.usuarios_lista = usuarios;
      },
      error => {
        console.log('Erro ao carregar usuários:', error);
      }
    );
  }

  adicionarUsuario(): void {
    this.usuarioService.criarUsuario(this.usuarioNovo).subscribe(
      novoUsuario => {
        this.usuarios_lista.push(novoUsuario);
        this.refresh();
      },
      error => {
        console.log('Erro ao adicionar usuário:', error);
      }
    );
  }

  toggleAtivo(id: number): void {
    this.usuarioService.toggleUsuario(id).subscribe(
      usuario => {
        const index = this.usuarios_lista.findIndex(u => u.id === usuario.id);
        if (index !== -1) {
          this.usuarios_lista[index] = usuario;
        }
      },
      error => {
        console.log('Erro ao alternar estado do usuário:', error);
      }
    );
  }

  deletarUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe(
      () => {
        this.refresh();
      },
      error => {
        console.log('Erro ao excluir usuário:', error);
      }
    );
  }

  dropUpdate(event: CdkDragDrop<Usuario[]>): void {
    if (this.usuarios_update.length === 0) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.usuarioUpdate = this.usuarios_update[0];
    }
  }

  drop(event: CdkDragDrop<Usuario[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.usuarios_update.length === 0) {
      this.usuarioUpdate = new Usuario();
    }
  }

  salvarUsuario(): void {
    this.usuarioService.atualizarUsuario(this.usuarioUpdate.id, this.usuarioUpdate).subscribe(
      () => {
        this.refresh();
      },
      error => {
        console.log('Erro ao salvar usuário:', error);
      }
    );
  }

  trackByFn(index: number, usuario: Usuario): number {
    return usuario.id;
  }

  getMinimizeState(): any {
    return {
      usuarios_lista: this.usuarios_lista,
      usuarios_update: this.usuarios_update,
      usuarioUpdate: this.usuarioUpdate,
      usuarioNovo: this.usuarioNovo
    };
  }
}

