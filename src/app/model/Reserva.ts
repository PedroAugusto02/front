import { ClienteAvulso } from "./ClienteAvulso";
import { Usuario } from "./Usuario";
import { Vendedor } from "./Vendedor";

export class Reserva {
    id!: number;
    vagaId!: number;  // Para referenciar a Vaga, se necessário
    usuario!: Usuario;
    vendedor!: Vendedor;
    clienteAvulso!: ClienteAvulso;
    dataHoraReserva!: Date;
    dataHoraTermino!: Date;
    valor!: number;
    pago: boolean = false;
}