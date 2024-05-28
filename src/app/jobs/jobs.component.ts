import { Component, OnInit } from '@angular/core';
import { TitleService } from '../service/title.service';
import { Jobs } from '../entity/Jobs';
import { InputtextComponent } from '../components/inputs/inputtext/inputtext.component';
import { CheckboxComponent } from '../components/inputs/checkbox/checkbox.component';
import { ButtonComponent } from '../components/buttons/button/button.component';
import { JobsService } from './service/jobs.service';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Usuario } from '../entity/Usuario';
import { UsuarioService } from '../usuario/service/usuario.service';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'jobs',
  standalone: true,
  imports: [InputtextComponent, CheckboxComponent, ButtonComponent, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  trabalhoNovo: Jobs = new Jobs();
  trabalhoSelecionado: Jobs = new Jobs();
  listaTrabalho: Jobs[] = [];
  listaTrabalhoSelecionados: Jobs[] = [];

  listaUsuarios: Usuario[] = [];


  constructor(
    private titleService: TitleService,
    private trabalhoService: JobsService,
    private usuarioService: UsuarioService,
    private loader: LoaderService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.setPageTitle("Trabalhos");
    }, 10);
    this.obterTrabalhos();
    this.obterUsuarios();
    this.loader.show();
  }

  refresh() {
    this.trabalhoSelecionado = new Jobs();
    this.trabalhoNovo = new Jobs();
    this.listaTrabalhoSelecionados = [];
    this.obterTrabalhos();
    this.obterUsuarios();
  }

  obterTrabalhos(): void {
    this.trabalhoService.obterTrabalhos().subscribe({
      next: (result) => {
        this.listaTrabalho = result;
      },
      error: (error) => {
        console.log('Erro ao carregar usuários:', error);
      }
    });
  }

  obterUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      usuarios => {
        this.listaUsuarios = usuarios;
      },
      error => {
        console.log('Erro ao carregar usuários:', error);
      }
    );
  }

  adicionarTrabalho(): void {
    this.trabalhoService.criarTrabalhos(this.trabalhoNovo).subscribe({
      next: (result) => {
        this.listaTrabalho.push(result);
        this.refresh()
      },
      error: (error) => {
        console.log('Erro ao adicionar usuário:', error);
      }
    });
  }

  dropSelecionado(event: CdkDragDrop<Jobs[]>, trabalhos: Jobs[]) {
    if (this.listaTrabalhoSelecionados.length == 0) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dropTrabalhos(event: CdkDragDrop<Jobs[]>) {
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

  dropUsuarios(event: CdkDragDrop<Usuario[]>) {
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
