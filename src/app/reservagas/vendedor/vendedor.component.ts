import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../../entity/Vendedor';
import { TitleService } from '../../service/title.service';
import { VendedorService } from '../service/vendedor.service';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { InputtextComponent } from '../../components/inputs/inputtext/inputtext.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  standalone: true,
  imports: [InputtextComponent,ButtonComponent,CommonModule],
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {

  vendedores_lista: Vendedor[] = [];
  vendedorNovo: Vendedor = new Vendedor();
  vendedorUpdate: Vendedor = new Vendedor();

  constructor(
    private vendedorService: VendedorService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.carregarVendedores();
    setTimeout(() => {
      this.titleService.setPageTitle("Vendedores");
    }, 10);
  }

  refresh() {
    this.vendedorUpdate = new Vendedor();
    this.vendedorNovo = new Vendedor();
    this.carregarVendedores();
  }

  carregarVendedores(): void {
    this.vendedorService.listarVendedores().subscribe(
      vendedores => {
        this.vendedores_lista = vendedores;
      },
      error => {
        console.log('Erro ao carregar vendedores:', error);
      }
    );
  }

  adicionarVendedor(): void {
    this.vendedorService.criarVendedor(this.vendedorNovo).subscribe(
      novoVendedor => {
        this.vendedores_lista.push(novoVendedor);
        this.refresh();
      },
      error => {
        console.log('Erro ao adicionar vendedor:', error);
      }
    );
  }

  selecionarVendedor(vendedor: Vendedor): void {
    this.vendedorUpdate = { ...vendedor };
  }

  salvarVendedor(): void {
    if (this.vendedorUpdate.id) {
      this.vendedorService.atualizarVendedor(this.vendedorUpdate.id, this.vendedorUpdate).subscribe(
        vendedorAtualizado => {
          const index = this.vendedores_lista.findIndex(v => v.id === vendedorAtualizado.id);
          if (index !== -1) {
            this.vendedores_lista[index] = vendedorAtualizado;
          }
          this.refresh();
        },
        error => {
          console.log('Erro ao salvar vendedor:', error);
        }
      );
    }
  }

  deletarVendedor(id: number): void {
    this.vendedorService.deletarVendedor(id).subscribe(
      () => {
        this.vendedores_lista = this.vendedores_lista.filter(v => v.id !== id);
        this.refresh();
      },
      error => {
        console.log('Erro ao deletar vendedor:', error);
      }
    );
  }

  cancelarEdicao(): void {
    this.vendedorUpdate = new Vendedor();
  }
}
