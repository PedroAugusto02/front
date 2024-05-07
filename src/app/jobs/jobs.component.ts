import { Component, OnInit } from '@angular/core';
import { TitleService } from '../service/title.service';
import { Jobs } from '../entity/Jobs';
import { InputtextComponent } from '../components/inputs/inputtext/inputtext.component';
import { CheckboxComponent } from '../components/inputs/checkbox/checkbox.component';
import { ButtonComponent } from '../components/buttons/button/button.component';
import { JobsService } from './service/jobs.service';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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


  constructor(
    private titleService: TitleService,
    private trabalhoService: JobsService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.setPageTitle("Trabalhos");
    }, 10);
    this.obterTrabalhos();
  }

  refresh() {
    this.trabalhoSelecionado = new Jobs();
    this.trabalhoNovo = new Jobs();
    this.obterTrabalhos();
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

  drop(event: CdkDragDrop<Jobs[]>) {
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
