import { Estacionamento } from "./Estacionamento";
import { Reserva } from "./Reserva";
import { TipoDeVaga } from "./TipoDeVaga";

export class Vaga {
  id!: number;
  estacionamento!: Estacionamento;
  disponivel: boolean = true;
  tipoDeVaga: TipoDeVaga = new TipoDeVaga();
  numeroDaVaga!: number;
  cor!: string;
  tempoDecorrido?: string;  // Campo para exibição no front-end
  reservas!: Reserva[];
}
