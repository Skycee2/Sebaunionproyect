import { Riders } from "./riders";

export class Ordenes {
    constructor(
        public id_orden: string,
        public uid?: string,
        public sector_id?: string,
        public cover?: string,
        public name_cliente?: string,
        public telefono_cliente?: string,
        public dir_recogida?: string[],
        public dir_entrega?: string[],
        public hora?: string,
        public distancia?: string,
        public foto?: string,
        public name_rider?: string,
        public telefono_rider?: string,
        public sin_asignar?: boolean,
        public finalizado?: boolean,
        public riders?: Riders
    ) {}
}