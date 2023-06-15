export interface Models {
}
export interface Usuario {
    uid: string;
    rut: string;
    nom_rso: string;
    direccion: string;
    correo: string;
    telefono: string;
    nom_usuario: string;
    password: string;
    tipo_usuario: string;

}

export interface Orden {
    id: string;
    tipo_envio: string;
    direccion_origen: string;
    comuna_orig: string;
    direccion_entrega: string;
    comuna_entr: string;
    nombre_contacto: string;
    telefono_contacto: number;
    intruccioenes_entrega: string;
    fecha_entrega: Date;
    hora_estimada_entrega: string;
    sin_asignar: boolean;
    creado_por: string;
    motociclista: string;
}