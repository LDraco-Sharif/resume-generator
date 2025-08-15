import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ResumePdfComponent } from './components/resume-pdf/resume-pdf.component';

export const routes: Routes = [
    {
        path: '',
        component: FormComponent
    },
    {
        path: 'resume',
        component: ResumePdfComponent
    }
];
