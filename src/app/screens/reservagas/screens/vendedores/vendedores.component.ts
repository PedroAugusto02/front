import { Component } from '@angular/core';
import { TitleService } from '../../../../service/title.service';
import { PaginationComponent } from "../../../../components/pagination/pagination.component";

@Component({
  selector: 'app-vendedores',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './vendedores.component.html',
  styleUrl: './vendedores.component.css'
})
export class VendedoresComponent {

  constructor(
    private titleService : TitleService,
  ){
    this.titleService.setPageTitle("Vendedores");
  }
}
