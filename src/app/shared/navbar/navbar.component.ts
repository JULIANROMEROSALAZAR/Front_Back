import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar-routes.config';
import { MenuType } from '../.././sidebar/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { global } from '../../../environments/global';
import { AuthData } from '../../../providers/auth-data';

declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    txtBuscar:'';
    location: Location;
    constructor(private router: Router, location:Location) {
        this.location = location;
    }

    ngOnInit(){       
        this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
    }
    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 2 );
        }
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    getPath(){
        return this.location.prepareExternalUrl(this.location.path());
    }
    getSalir(){
        new AuthData().logoutUser();
        localStorage.clear();
        this.router.navigate(['/security/login']);
    }
    getBuscar(){
        new AuthData().logoutUser();
        localStorage.clear();
        this.router.navigate(['/security/login']);
    }
}
