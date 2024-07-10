import { Estacionamento } from "./Estacionamento";


export class Vendedor {
  id!: number;
  nome: string = "";
  email: string = "";
  active: boolean = false;
  estacionamentos: Estacionamento[] = [];
}
