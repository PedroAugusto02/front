import { Carro } from "./Carro";
import { Reserva } from "./Reserva";
import { UserRoles } from "./UserRoles";

export class Usuario {
    id!: number;
    login: string = "";
    password: string = "";
    nome: string = "";
    email: string = "";
    role: UserRoles = new UserRoles();
    age: number = 0;
    active: boolean = false;
    creation_date: Date = new Date();
    updated_at: Date = new Date();
    carros: Carro[] = [];
    reservas: Reserva[] = [];
  }
