import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user.model';
import { ProyectosService } from '../../../services/proyectos.services'
import { ProyectosModel } from '../../../model/proyectos.model';

declare var $:any;
declare var demo:any;
@Component({
    moduleId: module.id,
    selector: ' home-cmp ',
    templateUrl: 'home.component.html',
    providers :[ProyectosService],
})

export class HomeComponent implements OnInit{
    //Propiedades
    public itemProyectos: ProyectosModel[];
    constructor(private router: Router, private dbProyectos: ProyectosService){
        if(this.CargaInicioSesion()){
            //carga toda la informacion de la pagina
            this.CargarProyectos();
        }
    }


    //Metodos
    //Valida autenticación
    CargaInicioSesion():boolean{
        if(localStorage.getItem("currentUser")){
            let objUser = User;
            objUser = JSON.parse(localStorage.getItem("currentUser"));
            demo.Alerta("Bienvenido a Comunidapp", objUser.displayName, "success");
            return true;
        }
        else{
            //Control de seguridad
            this.router.navigate(['/security/login']);
            return false;
        }
    }


    //Inicializa proyectos
    CargarProyectos(){
        var x = this.dbProyectos.getData();
        x.snapshotChanges().subscribe(item => {
            this.itemProyectos = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                
                y["$key"] = element.key;//identificador proyecto

                for (var i in y["Comentarios"]) {
                    y["Comentarios"][i]["$key"]=i;//identificador comentarios
                }

                for (var i in y["Avance"]) {
                    y["Avance"][i]["$key"]=i;//identificador Avance
                }

                for (var i in y["Likes"]) {
                    y["Likes"][i]["$key"]=i;//identificador Likes
                }

                this.itemProyectos.push(y as ProyectosModel);

            });
        });
    }


    //metodos
    LlenarProyecto(){

    }

    ngOnInit(){
        if(!$('.main-panel-security').hasClass('main-panel')){
            $('.main-panel-security').addClass('main-panel');
            $('.main-panel').removeClass('main-panel-security');
        }
    }



}

