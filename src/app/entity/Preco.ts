import { TabelaDePrecos } from "./TabelaDePrecos";

export class Preco {
  id!: number;
  tempoMinimo: number = 0;
  tempoMaximo: number = 0;
  valor: number = 0;
  tabelaDePrecosId!: number;
}
