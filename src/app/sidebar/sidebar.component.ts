import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';
import { User } from '../../model/user.model';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    constructor(){
        if(localStorage.getItem("currentUser")){
            let objUser = User;
            objUser = JSON.parse(localStorage.getItem("currentUser"));
        }
    }

    public menuItems: any[];
    public objUser = User;    

    ngOnInit() {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        $(".main-panel").animate({ scrollTop: 0 }, "slow");
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }

}
