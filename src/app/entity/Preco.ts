import { TabelaDePrecos } from "./TabelaDePrecos";

export class Preco {
  id!: number;
  tempoMinimo: number = 0;
  tempoMaximo: number = 0;
  valor: number = 0;
  tabelaDePrecos!: { id: number }; // Modificado para aceitar um objeto com apenas o ID
}
