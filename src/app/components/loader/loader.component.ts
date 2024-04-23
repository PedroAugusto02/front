import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  public active = false; // Indica se o loader está ativo

  constructor() { }

  ngOnInit(): void {
  }

  show(): void {
    this.active = true;
  }

  hide(): void {
    this.active = false;
  }

}
