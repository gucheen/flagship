import { Routes } from '@angular/router';
import { SystemListComponent } from './system-list/system-list.component';
import { SystemDetailComponent } from './system-detail/system-detail.component';

export const appRoutes: Routes = [
    { path: 'detail/:id', component: SystemDetailComponent },
    { path: '**', component: SystemListComponent },
];
