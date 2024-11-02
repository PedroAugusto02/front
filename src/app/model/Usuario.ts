import { AdminLevel } from "./AdminLevel";
import { Carro } from "./Carro";
import { Cidade } from "./Cidade";
import { Estacionamento } from "./Estacionamento";
import { Reserva } from "./Reserva";
import { UserRoles } from "./UserRoles";

export class Usuario {
  id!: number; // Manter como number pois é o tipo que Angular usa para IDs
  login: string = "";
  password: string = "";
  nome: string = "";
  role: UserRoles = UserRoles.USER;
  email: string = "";
  age: number = 0; // Você pode querer adicionar uma validação para idade aqui
  ddd: string = '41';
  telefone!: number; // Mudei de number para string
  endereco: string = "";
  bairro: string = "";
  cep: string = "";
  numero: string = "";
  complemento: string = "";
  nomeDaEmpresa: string = "";
  cnpj: string = "";
  active: boolean = false;
  passwordResetRequired: boolean = true;
  creation_date: Date = new Date();
  updated_at: Date = new Date();
  carros: Carro[] = [];
  reservas: Reserva[] = [];
  estacionamentos: Estacionamento[] = [];
  cidade!: Cidade; // Adiciona a propriedade cidade do tipo Cidade
  adminLevel!: AdminLevel; // Adiciona a propriedade adminLevel do tipo AdminLevel
}
