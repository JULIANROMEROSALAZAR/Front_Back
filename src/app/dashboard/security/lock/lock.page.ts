import { Component, OnInit } from '@angular/core';
import { global } from '../../../../environments/global';

declare var $:any;
declare var demo:any;

@Component({
  selector: 'app-lock',
  templateUrl: './lock.page.html',
  styleUrls: ['./lock.page.scss'],
})
export class LockPage implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../assets/js/demo.js');


    $().ready(function() {      

      $('.main-panel').addClass('main-panel-security');
      $('.main-panel-security').removeClass('main-panel');

      demo.checkFullPageBackgroundImage();

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    });
  }

  getNewUser(){
      return "/#/security/new";
  }
  getLoginUser(){
      return "/#/security/login";
  } 
}
