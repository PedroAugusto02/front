import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-atividades',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragPlaceholder],
  templateUrl: './atividades.component.html',
  styleUrl: './atividades.component.css'
})
export class AtividadesComponent {

  constructor(
    private titleService: TitleService) {
  }

  ngOnInit(): void {
    // Usando setTimeout para definir o título após um curto atraso
    setTimeout(() => {
      this.titleService.setPageTitle('Atividades');
    }, 10); // Defina o atraso desejado em milissegundos (por exemplo, 100ms)
  }

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
