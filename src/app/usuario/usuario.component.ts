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

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,InputtextComponent,ButtonComponent,MatCardModule,CheckboxComponent, MinibuttonComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  usuarios: Usuario[] = [];
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
        this.usuarios = usuarios;
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
        this.usuarios.push(novoUsuario); // Adiciona o novo usuário à lista
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
        const index = this.usuarios.findIndex(u => u.id === usuario.id);
        if (index !== -1) {
          this.usuarios[index] = usuario;
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
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      },
      error => {
        console.log('Erro ao excluir usuário:', error);
      }
    );
  }
}
