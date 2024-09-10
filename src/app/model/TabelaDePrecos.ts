import { Preco } from "./Preco";


export class TabelaDePrecos {
    id!: number;
    estacionamentoId!: number; // ID do Estacionamento associado
    precos: Preco[] = []; // Lista de preços
  }