import { Component, Input, OnChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DynamicTableComponent implements OnChanges {
  @Input() dataSource: any[] = [];
  columnsToDisplay: string[] = [];
  columnsToDisplayWithExpand: string[] = [];
  expandedElement: any | null = null;

  ngOnChanges() {
    if (this.dataSource && this.dataSource.length > 0) {
      // Pega as chaves do primeiro elemento e as usa como colunas
      this.columnsToDisplay = Object.keys(this.dataSource[0]);
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    }
  }

  editRow(element: any) {
    console.log("Editando", element);
  }
}
