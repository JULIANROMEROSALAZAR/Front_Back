import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProyectosModel } from '../model/proyectos.model';
import { FileUploadModel } from '../model/fileupload.model';
import * as firebase from 'firebase';

@Injectable()
export class ProyectosService {
  public itemRef: AngularFireList<any>;

  fileUploads: AngularFireList<FileUploadModel[]>;
  constructor(private db :AngularFireDatabase) {}

  getData(){
    this.itemRef = this.db.list(`Proyecto`);
    return this.itemRef;
  }

  insertProyecto(proyecto : ProyectosModel): string
  {
    const itemPath =  `Proyecto`;
    return this.db.list(itemPath).push(proyecto).key;
  }

  updateProyecto(proyecto : ProyectosModel){
    const itemPath =  `Proyecto/${proyecto.$key}`;
    
    firebase.database().ref(itemPath).update({
        Nombre: proyecto.Nombre,
        Descripcion : proyecto.Descripcion,
        Recursos: proyecto.Recursos,
        //IdUsuarioCreador : proyecto.IdUsuarioCreador,
        //IdUsuarioSolucionador : proyecto.IdUsuarioSolucionador.,
        //FechaCreacion: new Date().toISOString(),
        FechaModificacion:  new Date().toISOString(),
        //URLProyecto: proyecto.URLProyecto,
        Estado : proyecto.Estado
      });
  }

  pushFileToStorage(key: string, fileUpload: FileUploadModel, progress: {percentage: number}) {
    const storageRef = firebase.storage().ref();
    console.log(fileUpload.file);
    const uploadTask = storageRef.child(`/Proyecto/${key}.${fileUpload.file.name.split('.')[1]}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //actualiza la url de la imagen del proyecto
          firebase.database().ref('Proyecto/' + key).update({
            URLProyecto: `${downloadURL}`
          });
        });
      }
    );
    
  }

 
  getFileUploads(query = {}) {
    this.fileUploads = this.db.list('/Proyecto');
    return this.fileUploads
  }
 
  deleteFileUpload(fileUpload: FileUploadModel) {
    this.deleteFileDatabase(fileUpload.$key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name)
      })
      .catch(error => console.log(error))
  }
 
  private deleteFileDatabase(key: string) {
    return this.db.list(`/Proyecto/`).remove(key)
  }
 
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref()
    storageRef.child(`/Proyecto/${name}`).delete()
  }

}