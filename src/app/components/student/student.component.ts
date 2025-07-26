import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // ✅ Import Toastr

import { StudentService } from '../../services/student.service';
import { Student } from './student.model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  searchText: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService // ✅ Inject Toastr
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: () => {
        this.toastr.error('Failed to load students.', 'Error');
      }
    });
  }

  get filteredStudents(): Student[] {
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      student.department.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  editStudent(id: number) {
    this.router.navigate(['/edit', id]);
  }

  navigateToAddStudent() {
    this.router.navigate(['/add']);
  }

  onDelete(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.toastr.success('Student deleted successfully.', 'Success');
          this.loadStudents(); // Refresh list
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.toastr.error('Failed to delete student.', 'Error');
        }
      });
    }
  }
}
