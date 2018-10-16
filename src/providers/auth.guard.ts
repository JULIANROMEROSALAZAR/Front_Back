export class AuthGuard {
    ///Metodo que valida el acceso a la aplicacion
    ///autor. Ingeniero Julian Alexander Romero Salazar
    ///Celular. 312 382 1914
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        else{
            return false;
        }
    }

    ///Carga la URL que carga inicialmente la page
    ///autor. Ingeniero Julian Alexander Romero Salazar
    ///Celular. 312 382 1914
    PageInit() {
        if (localStorage.getItem('currentUser')) {
            return 'dashboard';
        }
        else{
            return 'security/login';
        }
    }
}
