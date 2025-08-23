import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ResumePdfComponent } from './components/resume-pdf/resume-pdf.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'form',
        component: FormComponent
    },
    {
        path: 'resume',
        component: ResumePdfComponent
    }
];
