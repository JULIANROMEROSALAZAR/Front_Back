import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../../services/proyectos.services'
import { ProyectosModel } from '../../../../model/proyectos.model';
import { ComentarioModel } from '../../../../model/comentario.model';
import { AvanceModel } from '../../../../model/avance.model';
import { LikesModel } from '../../../../model/likes.model';
import { User } from '../../../../model/user.model';
import { FileUploadModel } from '../../../../model/fileupload.model';

declare var $:any;
declare var demo:any;
@Component({
    moduleId: module.id,
    selector: 'regularforms-cmp',
    templateUrl: 'regularforms.component.html',
    providers :[ProyectosService],
})

export class RegularFormsComponent implements OnInit{
    constructor(private router: Router, private dbProyectos: ProyectosService){
        this.CargaInicioSesion()
    }

    progress: { percentage: number } = { percentage: 0 };
    currentFileUpload: FileUploadModel;
    selectedFiles: FileList

    private userUID = User;
    txtNombre:'';
    txtDescripcion:'';
    txtRecursos:'';
    chEstado:true;
    //fileImagen:any;

    //Valida autenticación
    CargaInicioSesion():boolean{
        if(localStorage.getItem("currentUser")){
            this.userUID = JSON.parse(localStorage.getItem("currentUser"));
            return true;
        }
        else{
            //Control de seguridad
            this.router.navigate(['/security/login']);
            return false;
        }
    }

    ngOnInit(){
    }

    selectFile(event) {
        const file = event.target.files.item(0)
 
        if (file.type.match('image.*')) {
          this.selectedFiles = event.target.files;
        } else {
          alert('invalid format!');
        }
    }

    upload(key:string) {
        const file = this.selectedFiles.item(0)
        this.selectedFiles = undefined
     
        this.currentFileUpload = new FileUploadModel(file);
        this.dbProyectos.pushFileToStorage(key, this.currentFileUpload, this.progress);
    }

    uploadBorrar() {
        this.selectedFiles = undefined;
        this.currentFileUpload = undefined;
    }

    CrearProyecto(){
        
        //Almacena la imagen asociada con el key
        this.upload(
            //Retorna el key de la inserción
            this.dbProyectos.insertProyecto(
                {
                    Nombre:this.txtNombre,
                    Descripcion : this.txtDescripcion,
                    Recursos: this.txtRecursos,
                    IdUsuarioCreador : this.userUID.uid,
                    IdUsuarioSolucionador : "",
                    FechaCreacion: new Date().toISOString(),
                    FechaModificacion: "",
                    URLProyecto: "../assets/img/image_placeholder.jpg",
                    Estado : "1",
                }
            )
        );

        demo.Alerta("Proyecto", "Se ha creado correctamente.", "success");
        
    }
}
