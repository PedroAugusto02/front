import { Carro } from "./Carro";
import { Estacionamento } from "./Estacionamento";
import { Reserva } from "./Reserva";
import { UserRoles } from "./UserRoles";

export class Usuario {
  id!: number;
  login: string = "";
  password: string = "";
  nome: string = "";
  role: UserRoles = UserRoles.USER;
  email: string = "";
  age: number = 0;
  telefone: number = 0;
  endereco: string = "";
  bairro: string = "";
  cep: string = "";
  numero: string = "";
  nomeDaEmpresa: string = "";
  cnpj: string = "";
  active: boolean = false;
  passwordResetRequired: boolean = true;
  creation_date: Date = new Date();
  updated_at: Date = new Date();
  carros: Carro[] = [];
  reservas: Reserva[] = [];
  estacionamentos: Estacionamento[] = [];
}