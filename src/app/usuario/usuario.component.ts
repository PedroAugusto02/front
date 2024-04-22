import { Component } from '@angular/core';
import { Usuario } from '../entity/Usuario';
import { UsuarioService } from './service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,MatFormFieldModule, MatInputModule, MatTableModule,MatSelectModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  usuarios: Usuario[] = [];
  usuarioNovo : Usuario = new Usuario();
  displayedColumns: string[] = ['nome', 'name', 'idade', 'ativo'];

  constructor(
    private usuarioService: UsuarioService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.carregarUsuarios();
    this.titleService.setPageTitle("Usuarios");
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

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource = filterValue.trim().toLowerCase();
  // }
}
