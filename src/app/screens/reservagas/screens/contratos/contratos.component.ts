import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { InputtextComponent } from '../../../../components/inputs/text/inputtext/inputtext.component';
import { ButtonComponent } from '../../../../components/buttons/button/button.component';
import { InputSelectComponent } from '../../../../components/inputs/inputselect/inputselect.component';
import { InputTelefoneComponent } from '../../../../components/inputs/text/input-telefone/input-telefone.component';
import { InputEmailComponent } from '../../../../components/inputs/text/input-email/input-email.component';
import { InputNumberComponent } from '../../../../components/inputs/text/input-number/input-number.component';
import { DatePickerComponent } from '../../../../components/inputs/date-picker-ui/date-picker.component';
import { TitleService } from '../../../../service/title.service';
import { InputNumberValorComponent } from "../../../../components/inputs/text/input-number-valor/input-number-valor.component";
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [
    MatTableModule, 
    MatSortModule
],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})
export class ContratosComponent implements AfterViewInit{

  constructor(
    private titleService: TitleService,
  )
  {
    this.titleService.setPageTitle("Contratos");  
  }

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
