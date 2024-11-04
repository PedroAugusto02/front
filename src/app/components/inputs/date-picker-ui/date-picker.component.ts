import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'date-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {

  @Input() value: Date | null = null; // Valor inicial da data
  @Input() label!: string;
  @Output() valueChange = new EventEmitter<Date>(); // Emissor de mudanças
  startDate: Date = new Date();
  
  onDateChange(event: Date ): void {
    this.valueChange.emit(event); // Emite a data selecionada para o componente pai
  }

}
