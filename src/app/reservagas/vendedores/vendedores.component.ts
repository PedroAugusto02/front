import { Component } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { TitleService } from '../../service/title.service';

@Component({
  selector: 'app-vendedores',
  standalone: true,
  imports: [],
  templateUrl: './vendedores.component.html',
  styleUrl: './vendedores.component.css'
})
export class VendedoresComponent {

  constructor(
    private titleService : TitleService,
  )
  {
    this.titleService.setPageTitle("Vendedores");
  }
}
