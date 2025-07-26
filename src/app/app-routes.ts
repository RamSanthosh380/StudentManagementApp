import { Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { AddStudentComponent } from './components/add-student/add-student';
import { EditStudentComponent } from './components/edit/edit.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full',
  },
  {
    path: 'student',
    loadComponent: () =>
      import('./components/student/student.component').then((m) => m.StudentComponent),
  },
  {
  path: 'add',
  component: AddStudentComponent
},

  {
  path: 'edit/:id',
  loadComponent: () =>
    import('./components/edit/edit.component').then((m) => m.EditStudentComponent),
 }

];

