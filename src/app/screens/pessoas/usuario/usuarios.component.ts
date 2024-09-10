import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { finalize, Subscription } from 'rxjs';
import { InputtextComponent } from '../../../components/inputs/inputtext/inputtext.component';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { CheckboxComponent } from '../../../components/inputs/checkbox/checkbox.component';
import { MinibuttonComponent } from '../../../components/buttons/minibutton/minibutton.component';
import { InputEmailComponent } from '../../../components/inputs/input-email/input-email.component';
import { InputPasswordComponent } from '../../../components/inputs/input-password/input-password.component';
import { InputSelectComponent } from '../../../components/inputs/inputselect/inputselect.component';
import { Usuario } from '../../../model/Usuario';
import { UserRoles } from '../../../model/UserRoles';
import { UsuarioService } from './service/usuario.service';
import { TitleService } from '../../../service/title.service';
import { MinimizableStateService } from '../../../service/minimizable-state.service';
import { AuthService } from '../../../authentication/auth.service';
import { LoaderService } from '../../../service/loader.service';
import { ModalService } from '../../../service/modal.service';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    InputtextComponent,
    ButtonComponent,
    MatCardModule,
    CheckboxComponent,
    MinibuttonComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    InputEmailComponent,
    InputPasswordComponent,
    InputSelectComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit, OnDestroy {

  private minimizeSubscription!: Subscription;
  private isMinimizing: boolean = false;

  usuarios_lista: Usuario[] = [];
  usuarios_update: Usuario[] = [];
  usuarioUpdate: Usuario = new Usuario();
  usuarioNovo: Usuario = new Usuario();

  roles = [
    { role: UserRoles.ADMIN, displayName: 'ADMIN' },
    { role: UserRoles.USER, displayName: 'USER' },
    { role: UserRoles.DONO, displayName: 'DONO' },
    { role: UserRoles.VENDEDOR, displayName: 'VENDEDOR' }
  ];

  constructor(
    private usuarioService: UsuarioService,
    private titleService: TitleService,
    private minimizableStateService: MinimizableStateService,
    private authService: AuthService,
    private loader: LoaderService,
    private modalService: ModalService,
  ) {
    this.titleService.setPageTitle("Usuarios");
  }

  ngAfterViewInit(): void {
    this.carregarUsuarios();
    this.restoreStateIfNeeded();

    // Inscrever-se no evento de minimização
    this.minimizeSubscription = this.minimizableStateService.getMinimizeEvent()
      .subscribe((componentName: string | null) => {
        if (componentName === 'UsuariosComponent') {
          this.isMinimizing = true;
          this.saveStateBeforeMinimize();
        }
      });
  }

  ngOnDestroy(): void {
    if (!this.isMinimizing) {
      // Limpar o estado do componente apenas se não estiver minimizando
      this.minimizableStateService.clearComponentState('UsuariosComponent');
    }

    // Desinscrever do evento de minimização
    if (this.minimizeSubscription) {
      this.minimizeSubscription.unsubscribe();
    }
  }

  refresh() {
    this.usuarioUpdate = new Usuario();
    this.usuarios_update = [];
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.loader.show();
    this.usuarioService.listarUsuarios().pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (usuarios) => {
        this.usuarios_lista = usuarios;
      },
      error: (error) => {
        console.log('Erro ao carregar usuários:', error);
      }
    });
  }

  adicionarUsuario(): void {
    this.loader.show();
    this.authService.register(this.usuarioNovo).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (result) => {
        this.usuarioNovo = new Usuario();
        this.modalService.showSuccess("Usuario cadastrado com Sucesso!");
        this.refresh();
      },
      error: (error) => {
        console.log('Erro ao adicionar usuário:', error);
      }
    });
  }
  

  deletarUsuario(id: number): void {
    this.loader.show();
    this.usuarioService.deleteUsuario(id).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: () => {
        this.refresh();
      },
      error: (error) => {
        console.log('Erro ao excluir usuário:', error);
      }
    });
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
    this.usuarioService.atualizarUsuario(this.usuarioUpdate.id, this.usuarioUpdate).subscribe({
      next: () => {
        this.refresh();
      },
      error: (error) => {
        console.log('Erro ao salvar usuário:', error);
      }
    });
  }

  saveStateBeforeMinimize(): void {
    const state = {
      usuarios_lista: this.usuarios_lista,
      usuarios_update: this.usuarios_update,
      usuarioUpdate: this.usuarioUpdate,
      usuarioNovo: this.usuarioNovo,
      roles: this.roles,
    };
    console.log('Salvando estado:', state);
    this.minimizableStateService.setComponentState('UsuarioComponent', state);
  }

  // Chamado antes de minimizar o componente
  onBeforeMinimize(): void {
    this.saveStateBeforeMinimize();
  }

  restoreStateIfNeeded(): void {
    const state = this.minimizableStateService.getComponentState('UsuarioComponent');
    if (state) {
      console.log('Restaurando estado:', state);
      this.usuarios_lista = state.usuarios_lista;
      this.usuarios_update = state.usuarios_update;
      this.usuarioUpdate = state.usuarioUpdate;
      this.usuarioNovo = state.usuarioNovo;
      this.roles = state.roles;
    }
  }

}
