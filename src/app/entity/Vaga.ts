import { Estacionamento } from "./Estacionamento";

export class Vaga {
    id!: number;
    estacionamento!: Estacionamento;
    disponivel: boolean = true;
  }
  