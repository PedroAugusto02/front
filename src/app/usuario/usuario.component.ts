import { Component } from '@angular/core';
import { Usuario } from '../entity/Usuario';
import { UsuarioService } from './service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitleService } from '../service/title.service';
import { InputtextComponent } from '../components/inputs/inputtext/inputtext.component';
import { ButtonComponent } from '../components/buttons/button/button.component';
import {MatCardModule} from '@angular/material/card';
import { CheckboxComponent } from '../components/inputs/checkbox/checkbox.component';
import { MinibuttonComponent } from '../components/buttons/minibutton/minibutton.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,InputtextComponent,ButtonComponent,MatCardModule,CheckboxComponent, MinibuttonComponent,CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  usuarios_lista: Usuario[] = [];
  usuarios_update: Usuario[] = []
  usuarioNovo: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.carregarUsuarios();
    setTimeout(() => {
      this.titleService.setPageTitle("Usuarios");
    }, 10);
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
    // Usar os dados do usuário novo do formulário
    this.usuarioService.criarUsuario(this.usuarioNovo).subscribe(
      novoUsuario => {
        this.usuarios_lista.push(novoUsuario); // Adiciona o novo usuário à lista
        this.usuarioNovo = new Usuario(); // Limpa o formulário após adicionar
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
        this.usuarios_lista = this.usuarios_lista.filter(u => u.id !== id);
      },
      error => {
        console.log('Erro ao excluir usuário:', error);
      }
    );
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.usuarios, event.previousIndex, event.currentIndex);
  // }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
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
  }
}
