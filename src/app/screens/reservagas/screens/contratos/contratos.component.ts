import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TitleService } from '../../../../service/title.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { InputtextComponent } from "../../../../components/inputs/text/inputtext/inputtext.component";
import { Router } from '@angular/router';

export interface Contrato {
  id: number;
  clienteNome: string;
  clienteCpf: string;
  contato: string;
  placaCarro: string;
  dataInicio: Date;
  dataFim: Date;
  metodoCobranca: string;
  valor: number;
  status: string;
}

const ELEMENT_DATA: Contrato[] = [
  {
    id: 1,
    clienteNome: 'João Silva',
    clienteCpf: '123.456.789-00',
    contato: 'joao.silva@email.com',
    placaCarro: 'ABC-1234',
    dataInicio: new Date('2024-01-01'),
    dataFim: new Date('2024-12-31'),
    metodoCobranca: 'MENSAL',
    valor: 250.0,
    status: 'ATIVO'
  },
  // Adicione mais dados aqui
];

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatButton,
    MatButtonModule,
    InputtextComponent
],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})
export class ContratosComponent implements AfterViewInit {
  constructor(
    private titleService: TitleService,
    private router: Router,
  ) {
    this.titleService.setPageTitle("Contratos");
  }

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [
    'acao', 'clienteNome', 'clienteCpf', 'placaCarro', 'dataInicio', 
    'dataFim', 'metodoCobranca', 'valor', 'status'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  handleButtonClick(contrato: Contrato) {
    // Navega para a tela de detalhes com o contrato selecionado
    this.router.navigateByUrl('/contratos/detalhes', { state: { contrato } });
  }

  buscarContrato() {

  }
}

