import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import initTooltips = require('../../../assets/js/init/initTooltips');
import { User } from '../../../model/user.model';
import { ComentariosService } from '../../../services/comentarios.services'
//import { Observable } from 'rxjs';
import { ComentarioModel } from '../../../model/comentario.model';
import { ProyectosModel } from '../../../model/proyectos.model';

declare var $:any;
declare var demo:any;
@Component({
    moduleId: module.id,
    selector: 'widgets-cmp',
    templateUrl: 'widgets.component.html',
    providers :[ComentariosService],
})

export class WidgetsComponent implements OnInit{
    //Propiedades
    public itemComentarios: ComentarioModel[];//Observable<any>;
    public itemProyectos: ProyectosModel[];//Observable<any>;
    private userUID = User;
    txtComentarioTexto :'';

    constructor(private router: Router, public dbService: ComentariosService){
        this.CargaInicioSesion()
        // if(this.CargaInicioSesion()){
        //     //carga toda la informacion de la pagina
        this.CargarProyectosComentarios();
        // }
    }

    ngOnInit(){
        //initTooltips();
        $.getScript('../../../assets/js/init/initTooltips.js');
    
    }
    //Metodos
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


    //Inicializa proyectos
    CargarProyectosComentarios(){

        var x = this.dbService.getProyectoData();
        x.snapshotChanges().subscribe(item => {
            this.itemProyectos = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                
                y["$key"] = element.key;//identificador proyecto


                let  objComentarios: ComentarioModel[];

                objComentarios = [];
                for (var i in y["Comentarios"]) {
                    //y["Comentarios"][i]["$key"]=i;//identificador comentarios
                    objComentarios.push({
                        $key: y["Comentarios"][i]["$key"],
                        idUsuario : y["Comentarios"][i]["idUsuario"],
                        Descripcion : y["Comentarios"][i]["Descripcion"],
                        URLPhoto : y["Comentarios"][i]["URLPhoto"],
                        FechaCreacion: y["Comentarios"][i]["FechaCreacion"],
                    });
                }
                y["Comentarios"] = objComentarios;



                // for (var i in y["Avance"]) {
                //     y["Avance"][i]["$key"]=i;//identificador Avance
                // }

                // for (var i in y["Likes"]) {
                //     y["Likes"][i]["$key"]=i;//identificador Likes
                // }

                
                this.itemProyectos.push(y as ProyectosModel);

            });
        });
    
    }

    insComentario(idProyecto: string){
        this.dbService.setProyecto(idProyecto);//determina a que proyecto carresponde
        this.dbService.insertComentarios(
            {
                $key: null,
                idUsuario: this.userUID.uid,
                Descripcion: this.txtComentarioTexto,
                URLPhoto: this.userUID.photoURL,
                FechaCreacion: new Date().toISOString(),
            }
        );
    }

    // onSubmit(comentariosForm: NgForm) {
    //     if (comentariosForm.value.$key == null)
    //       this.dbService.insertComentarios(comentariosForm.value);
    //     else
    //       this.dbService.updateComentarios(comentariosForm.value);
    // }
    

}
