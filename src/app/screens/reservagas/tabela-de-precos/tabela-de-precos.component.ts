import { Component } from '@angular/core';
import { TitleService } from '../../../service/title.service';

@Component({
  selector: 'app-tabela-de-precos',
  standalone: true,
  imports: [],
  templateUrl: './tabela-de-precos.component.html',
  styleUrl: './tabela-de-precos.component.css'
})
export class TabelaDePrecosComponent {

  constructor(
    private titleService: TitleService,
  ){
    this.titleService.setPageTitle("Preços");
  }

}
