import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        redirectTo : 'auth/login',
        pathMatch : 'full'
    }
];
