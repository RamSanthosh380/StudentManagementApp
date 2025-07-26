import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Student } from '../components/student/student.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7075/api/student';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      catchError(error => {
        this.toastr.error('Failed to load students', 'Error');
        return throwError(() => error);
      })
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      tap(() => this.toastr.success('Student added successfully', 'Success')),
      catchError(error => {
        this.toastr.error('Failed to add student', 'Error');
        return throwError(() => error);
      })
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.toastr.success('Student deleted successfully', 'Success')),
      catchError(error => {
        this.toastr.error('Failed to delete student', 'Error');
        return throwError(() => error);
      })
    );
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        this.toastr.error('Failed to fetch student details', 'Error');
        return throwError(() => error);
      })
    );
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student).pipe(
      tap(() => this.toastr.success('Student updated successfully', 'Success')),
      catchError(error => {
        this.toastr.error('Failed to update student', 'Error');
        return throwError(() => error);
      })
    );
  }
}
