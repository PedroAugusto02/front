import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-inputselect',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule],
  templateUrl: './inputselect.component.html',
  styleUrl: './inputselect.component.css'
})
export class InputselectComponent {
  selected = 'option2';
}
