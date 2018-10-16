import { ComentarioModel } from '../model/comentario.model';
import { AvanceModel } from '../model/avance.model';
import { LikesModel } from '../model/likes.model';

export class ProyectosModel {
    $key?: string;
    Nombre:string;
    Descripcion : string;
    Recursos: string;
    Comentarios?: ComentarioModel[];
    Avance?: AvanceModel[];
    Likes?: LikesModel[];
    URLProyecto?: string;
    IdUsuarioCreador : string;
    IdUsuarioSolucionador : string;
    FechaCreacion: string;
    FechaModificacion: string;
    Estado : string;
}

