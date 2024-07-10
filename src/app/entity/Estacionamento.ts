import { Vendedor } from "./Vendedor";


export class Estacionamento {
  id!: number;
  nome: string = "";
  endereco: string = "";
  quantidadeVagas: number = 0;
  vendedores: Vendedor[] = [];
}
