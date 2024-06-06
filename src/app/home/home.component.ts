import { Component } from '@angular/core';
import { TitleService } from '../service/title.service';
import { CardComponent } from '../components/card/card.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent,IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private titleService: TitleService) {
  }

  ngOnInit(): void {
    // Usando setTimeout para definir o título após um curto atraso
    setTimeout(() => {
      this.titleService.setPageTitle('Home');
    }, 10); // Defina o atraso desejado em milissegundos (por exemplo, 100ms)
  }

}
