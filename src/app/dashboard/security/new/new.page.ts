import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../model/user.model';
import { AuthData } from '../../../../providers/auth-data';

//validaciones y conexion
import * as firebase from 'firebase';
import { EmailValidator } from '../../../../validators/email';

declare var $:any;
declare var demo:any;
@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  constructor(private router: Router) { 
    new AuthData().logoutUser();
    localStorage.clear();
  }

  txtEmail:'';
  txtPassword:'';
  uiCheck :'';
  txtConfirmarPassword :'';

  ngOnInit() {
    $.getScript('../../../../assets/js/demo.js');


    $().ready(function() {      
      $(".plt-desktop").removeClass('nav-open');
      $('.main-panel').addClass('main-panel-security');
      $('.main-panel-security').removeClass('main-panel');

      demo.checkFullPageBackgroundImage();
      setTimeout(function() {
          // after 1000 ms we add the class animated to the login/register card
          $('.card').removeClass('card-hidden');
      }, 700)

    });
  }

  getLoginUser(){
    return "/#/security/login";
  }
  getLockUser(){
      return "/#/security/lock";
  } 

  getValidarUsers(){
    if(this.txtPassword == this.txtConfirmarPassword){
      if(EmailValidator.isValid(this.txtEmail)){
        firebase.auth().signInWithEmailAndPassword(this.txtEmail, this.txtPassword).then(authData => {

          //lineas para almacenamiento - informacion del usuario
          User.displayName = (authData.user.displayName? authData.user.displayName : ""),
          User.email = (authData.user.email ? authData.user.email : ""),
          User.photoURL = (authData.user.photoURL ? authData.user.photoURL : ""),
          User.uid = (authData.user.uid ? authData.user.uid : ""),
          User.providerData = (authData.user.providerData ? authData.user.providerData : []),
          localStorage.setItem("currentUser", JSON.stringify(User));
          
          //redireccionamiento
          this.router.navigate(['/dashboard']);

        }, error => {
          demo.Alerta("Creación usuario", "datos invalidos, verifique e intente nuevamente.", "warning");
          console.log("Error creación fallido");
          if(localStorage.getItem("currentUser")){
            localStorage.removeItem("currentUser");
          }
        });      
      }
      else{
        demo.Alerta("Creación usuario", "Correo invalido, verifique e intente nuevamente.", "warning");
      }
    }
    else{
      demo.Alerta("Creación usuario", "Confirmación de password invarido verifique e intente nuevamente.", "warning");
    }
  }

}
