import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {

  @Input() icon!: String;

}
