import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimeEntryTableComponent } from './time-entry-table/time-entry-table.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'category/:categoryId/time-entries',
        component: TimeEntryTableComponent
    },
];
