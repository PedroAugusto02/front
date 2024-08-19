import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule,CommonModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DynamicTableComponent {
  // Lista de dados passada para o componente via Input
  @Input() dataSource: any[] = [];

  // Colunas a serem exibidas, geradas dinamicamente
  columnsToDisplay: string[] = [];
  columnsToDisplayWithExpand: string[] = [];
  expandedElement: any | null = null;

  ngOnChanges() {
    if (this.dataSource && this.dataSource.length > 0) {
      this.columnsToDisplay = Object.keys(this.dataSource[0]);
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    }
  }

  // Função para editar a linha
  editRow(element: any) {
    // Lógica de edição da linha
    console.log("Editando", element);
  }
}
