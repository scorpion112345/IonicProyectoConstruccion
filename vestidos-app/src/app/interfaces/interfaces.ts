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

export interface RespuestaVestidos {
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


export interface RespuestaPagos {
  ok: boolean;
  pagos: Pago[];
}

export interface Pago {
  id?: number;
  id_cliente?: number;
  fecha?: string;
  monto?: number;
  total?: number;
  estado?: string;
}

export interface RespuestaCita {
  ok?: boolean;
  citas?: Cita[];
  mensaje?: string;
}

export interface Cita {
  id_cliente?: string;
  fecha?: string;
  hora?: string;
  tipo_cita?: string;
}