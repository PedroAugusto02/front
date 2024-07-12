import {Component} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'toggle',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  checked = false;
  disabled = false;
}
