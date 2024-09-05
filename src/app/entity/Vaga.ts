import { Estacionamento } from "./Estacionamento";
import { Reserva } from "./Reserva";

export class Vaga {
  id!: number;
  estacionamento!: Estacionamento;
  disponivel: boolean = true;
  numeroDaVaga!: number;
  cor!: string;
  tempoDecorrido?: string;  // Campo para exibição no front-end
  reservas!: Reserva[];
}
