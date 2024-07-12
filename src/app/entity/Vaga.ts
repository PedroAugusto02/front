import { Estacionamento } from "./Estacionamento";
import { Reserva } from "./Reserva";

export class Vaga {
    id!: number;
    estacionamento!: Estacionamento;
    disponivel: boolean = true;
    reservas!: Reserva[];
  }
  