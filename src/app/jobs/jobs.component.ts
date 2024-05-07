import { Component, OnInit } from '@angular/core';
import { TitleService } from '../service/title.service';
import { Jobs } from '../entity/Jobs';
import { InputtextComponent } from '../components/inputs/inputtext/inputtext.component';
import { CheckboxComponent } from '../components/inputs/checkbox/checkbox.component';
import { ButtonComponent } from '../components/buttons/button/button.component';
import { JobsService } from './service/jobs.service';

@Component({
  selector: 'jobs',
  standalone: true,
  imports: [InputtextComponent, CheckboxComponent, ButtonComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  trabalhoNovo: Jobs = new Jobs();
  trabalhoUpdate: Jobs = new Jobs();
  ListaTrabalho: Jobs[] = [];

  constructor(
    private titleService: TitleService,
    private trabalhoService: JobsService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.setPageTitle("Trabalhos");
    }, 10);
  }

  refresh() {
    this.trabalhoUpdate = new Jobs();
    this.trabalhoNovo = new Jobs();
    this.obterTrabalhos();
  }

  obterTrabalhos(): void {
    this.trabalhoService.obterTrabalhos().subscribe({
      next: (result) => {
        this.ListaTrabalho = result;
      },
      error: (error) => {
        console.log('Erro ao carregar usuários:', error);
      }
    });
  }

  adicionarTrabalho(): void {
    this.trabalhoService.criarTrabalhos(this.trabalhoNovo).subscribe({
      next: (result) => {
        this.ListaTrabalho.push(result);
        this.refresh()
      },
      error: (error) => {
        console.log('Erro ao adicionar usuário:', error);
      }
    });
  }

}
