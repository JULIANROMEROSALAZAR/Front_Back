import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//validaciones y conexion
import * as firebase from 'firebase';
import { EmailValidator } from '../../../../validators/email';
//import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../../../model/user.model';

declare var $:any;
declare var demo:any;
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }
  
  showNav = true;
  txtEmail:'';
  txtPassword:'';

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

  getAuthenticaGoogle(){
    return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(result => {
          return firebase.auth().getRedirectResult;
    });
  }

  getAuthenticaFacebook(){
    return firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    .then(result => {
        return firebase.auth().getRedirectResult;
    });
  }


  getValidarUsers(){
    if(EmailValidator.isValid(this.txtEmail)){

      firebase.auth().createUserWithEmailAndPassword(this.txtEmail, this.txtPassword).then(authData => {

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
        demo.Alerta("Inicio sesión", "Usuario y/o clave invalida.", "warning");
        console.log("Error loggueo fallido");
        if(localStorage.getItem("currentUser")){
          localStorage.removeItem("currentUser");
        }
      });      
    }
    else{
      demo.Alerta("Inicio sesión", "Correo invalido, verifique e intente nuevamente.", "warning");
    }
  }

  getNewUser(){
      return "/#/security/new";
  }
  getLockUser(){
      return "/#/security/lock";
  }    

}
