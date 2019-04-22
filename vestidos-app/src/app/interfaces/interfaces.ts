export interface RespuestaClientes {
  ok: boolean;
  clientes: Cliente[];
}

export interface Cliente {
  id?: number;
  id_vestido?: number;
  nombre?: string;
  apellidos?: string;
  telefono?: string;
}

interface RootObject {
  ok: boolean;
  vestidos: Vestido[];
  mensaje: string;
}

export interface Vestido {
  id?: number;
  modelo?: string;
  color?: string;
  tela?: string;
  talla?: string;
  complementos?: string;
  estado?: string;
  observaciones?: string;
}