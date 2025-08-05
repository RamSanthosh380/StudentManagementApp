import { Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard'; // ✅ Add this

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'student',
    canActivate: [AuthGuard], // ✅ Protect route
    loadComponent: () =>
      import('./components/student/student.component').then((m) => m.StudentComponent),
  },
  {
    path: 'add',
    canActivate: [AuthGuard], // ✅ Protect route
    component: AddStudentComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard], // ✅ Protect route
    loadComponent: () =>
      import('./components/edit/edit.component').then((m) => m.EditStudentComponent),
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
