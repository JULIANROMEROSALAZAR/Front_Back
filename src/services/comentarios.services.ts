import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ComentarioModel } from '../model/comentario.model';

@Injectable()
export class ComentariosService {
  comentariosList: AngularFireList<any>;
  keyProyecto: string = "1";
  //selectedEmployee: ComentarioModel = new ComentarioModel();
  constructor(private firebase :AngularFireDatabase ) { 
    //this.comentariosList = this.firebase.list('Proyecto/Comentarios');
  }

  setProyecto(idProyecto: string): void{
    this.keyProyecto = idProyecto;
  }

  getProyectoData(): AngularFireList<any>{
    return this.firebase.list(`Proyecto`);
  }

  getData(){
    this.comentariosList = this.firebase.list(`Proyecto/${this.keyProyecto}/Comentarios`);
    return this.comentariosList;
  }

  // Return a single observable item
  getItem(idComentario: string) {
    const itemPath =  `Proyecto/${this.keyProyecto}/Comentarios/${idComentario}`;
    return this.firebase.list(itemPath);
  } 

  insertComentarios(comentario : ComentarioModel)
  {
    const itemPath =  `Proyecto/${this.keyProyecto}/Comentarios`;
    this.firebase.list(itemPath).push({
      idUsuario: comentario.idUsuario,
      Descripcion: comentario.Descripcion,
      URLPhoto: comentario.URLPhoto,
      FechaCreacion: comentario.FechaCreacion
    });
  }

  updateComentarios(comentario : ComentarioModel){
    this.comentariosList.update(comentario.$key,
      {
        idUsuario: comentario.idUsuario,
        Descripcion: comentario.Descripcion,
        URLPhoto: comentario.URLPhoto,
        FechaCreacion: comentario.FechaCreacion
      });
  }

  deleteComentarios($key : string){
    this.comentariosList.remove($key);
  }

}