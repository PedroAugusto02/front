import { Usuario } from "./Usuario";

export class Jobs {
    id!: number;
    title: string = "";
    description: string = "";
    usuario?: Usuario;
    active: boolean = false;
  }