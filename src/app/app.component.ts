import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Events, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from "@ionic/angular";
import { MODULE_ROUTES,MODULE_COMPONENTS } from './dashboard/dashboard.routes';
import { firebaseConfig } from '../environments/firebaseConfig';
import { global } from '../environments/global';
import * as firebase from 'firebase';
import { User } from '../model/user.model';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  location: Location;
  //public pageAthenticate: boolean = false;
  constructor(
      platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      public navCtrl: NavController,
      public router: Router,
      location:Location) {
    this.location = location;
  }

  ngOnInit(){
    // Initialize Firebase
    firebase.auth().onAuthStateChanged((user) => {

      $.getScript('../assets/js/init/initMenu.js');
      $.getScript('../assets/js/demo.js');
      
      if (!user) {
        if(this.location.prepareExternalUrl(this.location.path()).toLowerCase().substring(0,11) != '#/security/'){

          //Redireccionamiento a la pagina de logueo
          this.router.navigate(['/security/login']);

        }
      }
      else{

        //lineas para almacenamiento - informacion del usuario
        User.displayName = (user.displayName? user.displayName : ""),
        User.email = (user.email ? user.email : ""),
        User.photoURL = (user.photoURL ? user.photoURL : ""),
        User.uid = (user.uid ? user.uid : ""),
        User.providerData = (user.providerData ? user.providerData : []),
        localStorage.setItem("currentUser", JSON.stringify(User));

        if(this.location.prepareExternalUrl(this.location.path()).toLowerCase().substring(0,16) == '#/security/login'){

          //Redireccionamiento a la pagina home
          this.router.navigate(['/dashboard']);

        }
      }
    });
  }

  public isMap():boolean{
    if(this.location.prepareExternalUrl(this.location.path()).toLowerCase().substring(0,17) == '#/maps/fullscreen'){
        return true;
    }
    else {
        return false;
    }
  }

  public isSecurity():boolean{
    if(this.location.prepareExternalUrl(this.location.path()).toLowerCase().substring(0,11) == '#/security/'){
      return false;
    }
    else {
        return true;
    }
    //return this.pageAthenticate;
  }
  
}
