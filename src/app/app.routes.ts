import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
    },
    {
        path: 'principal',
        loadComponent: () => import('./paginas/principal/principal.component').then( m => m.PrincipalComponent)
    },
];
