import { Component, ElementRef, ViewChild } from '@angular/core';
import { TitleService } from '../../../../service/title.service';

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
  ){
    this.titleService.setPageTitle("Vendedores");
  }

  @ViewChild('resizableElement') resizableElement!: ElementRef;

}
