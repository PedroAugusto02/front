import { ClienteAvulso } from "./ClienteAvulso";
import { Usuario } from "./Usuario";
import { Vaga } from "./Vaga";
import { Vendedor } from "./Vendedor";

export class Reserva {
    id!: number;
    vaga!: Vaga;  // Para referenciar a Vaga, se necessário
    usuario!: Usuario;
    vendedor!: Vendedor;
    clienteAvulso!: ClienteAvulso;
    dataHoraReserva!: Date;
    dataHoraTermino!: Date;
    valor!: number;
    pago: boolean = false;
}