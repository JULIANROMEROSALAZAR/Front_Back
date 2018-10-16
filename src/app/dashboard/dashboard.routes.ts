import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExtendedFormsComponent } from './forms/extendedforms/extendedforms.component';
import { RegularFormsComponent } from './forms/regularforms/regularforms.component'
import { ChartsComponent } from './charts/charts.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { UserComponent } from './pages/user/user.component';
//import { TimelineComponent } from './pages/timeline/timeline.component';
import { LoginPage } from './security/login/login.page';
import { NewPage } from './security/new/new.page';
import { LockPage } from './security/lock/lock.page';
import { AuthGuard } from "../../providers/auth.guard";
//
export const MODULE_ROUTES: Route[] =[

    { path: '', redirectTo: 'security/login', pathMatch: 'full' },  
    { path: 'dashboard', component: HomeComponent},
    { path: 'security/login', component: LoginPage},
    { path: 'security/new', component: NewPage},
    { path: 'security/lock', component: LockPage},
    { path: 'forms/regular', component: RegularFormsComponent},
    { path: 'forms/extended', component: ExtendedFormsComponent},
    { path: 'charts', component: ChartsComponent},
    { path: 'widgets', component: WidgetsComponent},
    { path: 'pages/user', component: UserComponent},

]
//
export const MODULE_COMPONENTS = [
    HomeComponent,
    LoginPage,
    NewPage,
    LockPage,
    ExtendedFormsComponent,
    RegularFormsComponent,
    ChartsComponent,
    WidgetsComponent,
    UserComponent
]
