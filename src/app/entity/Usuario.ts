import { Carro } from "./Carro";
import { Reserva } from "./Reserva";
import { UserRoles } from "./UserRoles";

export class Usuario {
  id!: number;
  login: string = "";
  password: string = "";
  nome: string = "";
  email: string = "";
  role: UserRoles = UserRoles.USER; 
  age: number = 0;
  active: boolean = false;
  passwordResetRequired: boolean = true;
  creation_date: Date = new Date();
  updated_at: Date = new Date();
  carros: Carro[] = [];
  reservas: Reserva[] = [];
}