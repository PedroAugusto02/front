import { Usuario } from "./Usuario";
import { Vendedor } from "./Vendedor";

export class Reserva {
    id!: number;
    usuario!: Usuario;
    vendedor!: Vendedor;
    dataHoraReserva!: Date;
    dataHoraTermino!: Date;
    valor!: number;
}