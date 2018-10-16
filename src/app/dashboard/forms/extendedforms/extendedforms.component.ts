import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../model/user.model';
import { ProyectosService } from '../../../../services/proyectos.services'
import { ProyectosModel } from '../../../../model/proyectos.model';
import { FileUploadModel } from '../../../../model/fileupload.model';

declare var $:any;
declare var demo:any;
@Component({
    moduleId: module.id,
    selector: 'extendedforms-cmp',
    templateUrl: 'extendedforms.component.html',
    providers :[ProyectosService],
})

export class ExtendedFormsComponent implements OnInit{
    //Propiedades
    public itemProyectos: ProyectosModel[];
    public item_Proyecto: ProyectosModel;
    public urlNuevoProyecto: string = "../../forms/regular";

    progress: { percentage: number } = { percentage: 0 };
    selectedFiles: FileList;
    currentFileUpload: FileUploadModel;
    
    constructor(private router: Router, private dbProyectos: ProyectosService){
        if(this.CargaInicioSesion()){
            //carga toda la informacion de la pagina
            this.CargarProyectos();
        }
    }

    ngOnInit() {

//         $('.datetimepicker').datetimepicker({
//             icons: {
//                 time: "fa fa-clock-o",
//                 date: "fa fa-calendar",
//                 up: "fa fa-chevron-up",
//                 down: "fa fa-chevron-down",
//                 previous: 'fa fa-chevron-left',
//                 next: 'fa fa-chevron-right',
//                 today: 'fa fa-screenshot',
//                 clear: 'fa fa-trash',
//                 close: 'fa fa-remove',
//                 inline: true
//             }
//          });
//          $('.datepicker').datetimepicker({
//             format: 'MM/DD/YYYY',
//             icons: {
//                 time: "fa fa-clock-o",
//                 date: "fa fa-calendar",
//                 up: "fa fa-chevron-up",
//                 down: "fa fa-chevron-down",
//                 previous: 'fa fa-chevron-left',
//                 next: 'fa fa-chevron-right',
//                 today: 'fa fa-screenshot',
//                 clear: 'fa fa-trash',
//                 close: 'fa fa-remove',
//                 inline: true
//             }
//          });
//          $('.timepicker').datetimepicker({
// //          format: 'H:mm',    // use this format if you want the 24hours timepicker
//             format: 'h:mm A',    //use this format if you want the 12hours timpiecker with AM/PM toggle
//             icons: {
//                 time: "fa fa-clock-o",
//                 date: "fa fa-calendar",
//                 up: "fa fa-chevron-up",
//                 down: "fa fa-chevron-down",
//                 previous: 'fa fa-chevron-left',
//                 next: 'fa fa-chevron-right',
//                 today: 'fa fa-screenshot',
//                 clear: 'fa fa-trash',
//                 close: 'fa fa-remove',
//                 inline: true
//             }
//          });   
//         // Sliders for demo purpose in refine cards section
//         // Sliders for demo purpose
//         $('#sliderRegular').noUiSlider({
//             start: 40,
//             connect: "lower",
//             range: {
//                 min: 0,
//                 max: 100
//             }
//         });

//         $('#sliderDouble').noUiSlider({
//             start: [20, 60] ,
//             connect: true,
//             range: {
//                 min: 0,
//                 max: 100
//             }
//         });
        // initDatetimepickers();
        // initSliders();

    }

    CambioEstado(value:string){
        this.item_Proyecto.Estado = value;
        //console.log(this.item_Proyecto);
    }

    //Metodos
    //Valida autenticación
    CargaInicioSesion():boolean{
        if(localStorage.getItem("currentUser")){
            let objUser = User;
            objUser = JSON.parse(localStorage.getItem("currentUser"));
            //demo.Alerta("Bienvenido a Comunidapp", objUser.displayName, "success");
            return true;
        }
        else{
            //Control de seguridad
            this.router.navigate(['/security/login']);
            return false;
        }
    }

    SelecProyecto(key:string){
        this.item_Proyecto = this.itemProyectos.find(function(x) { return x.$key == key });
        //console.log(key);
        //console.log(this.item_Proyecto);
    }

    
    //Inicializa proyectos
    CargarProyectos(){
        var x = this.dbProyectos.getData();
        x.snapshotChanges().subscribe(item => {
            this.itemProyectos = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                
                y["$key"] = element.key;//identificador proyecto
                y["Comentarios"]=[];
                y["Avance"]=[];
                y["Likes"]=[];

                //console.log(this.itemProyectos);
                this.itemProyectos.push(y as ProyectosModel);

            });
        });
    }


    ModificarProyecto(){
        if(this.item_Proyecto){

            //Almacena la imagen asociada con el key
            this.dbProyectos.updateProyecto(this.item_Proyecto);

            if(this.selectedFiles != undefined){
                this.upload(this.item_Proyecto.$key);
            }

            demo.Alerta("Proyecto", "Se ha modificado correctamente.", "success");
            
        }
    }


    upload(key:string) {
        if(this.selectedFiles != undefined){

            const file = this.selectedFiles.item(0);
            this.selectedFiles = undefined
     
            this.currentFileUpload = new FileUploadModel(file);
            this.dbProyectos.pushFileToStorage(key, this.currentFileUpload, this.progress);
        }
    }

}
