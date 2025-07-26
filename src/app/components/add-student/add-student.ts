import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../student/student.model';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-student.html',
})
export class AddStudentComponent {
  student: Student = {
    id: 0,
    name: '',
    age: 0,
    department: ''
  };

  constructor(private studentService: StudentService, private router: Router) {}


  onSubmit() {
    this.studentService.addStudent(this.student).subscribe(() => {
      alert('✅ Student added successfully!');
      this.router.navigate(['/']); // Redirect to list
    });
  }

    
  goBack() {
    this.router.navigate(['/']) // 👈 Navigate to student list or home
  }
}
