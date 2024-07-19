import { Carro } from "./Carro";
import { Reserva } from "./Reserva";

export class Usuario {
    id!: number;
    name: string = "";
    email: string = "";
    senha: string = "";
    age: number = 0;
    active: boolean = false;
    carro: Carro[] = [];
    reserva: Reserva[] = [];
  }