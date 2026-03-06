import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';


export const adminRoutes: Routes = [
    {
        path: '', component: Dashboard,
        children: [
            { path: '', redirectTo: 'config-drone', pathMatch: 'full' },
            {
                path: 'config-drone',
                children: [
                    { path: '', redirectTo: 'overview', pathMatch: 'full' },
                ],
            },
        ],
    },
];