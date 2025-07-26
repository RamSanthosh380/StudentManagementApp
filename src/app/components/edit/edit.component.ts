import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // ✅ Required
import { StudentService } from '../../services/student.service';
import { Student } from '../student/student.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditStudentComponent implements OnInit 
{

  studentForm!: FormGroup;

  studentId: number = 0;
  student: Student = {
    id: 0,
    name: '',
    age: 0,
    department: ''
  };

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(this.studentId).subscribe({
      next: data => this.student = data,
      error: err => {
        console.error(err);
        alert('Student not found!');
      }
    });
  }

  onUpdate() {
    this.studentService.updateStudent(this.student.id, this.student).subscribe({
      next: () => {
        alert('Student updated successfully!');
        this.router.navigate(['/students']);
      },
      error: err => {
        alert('Update failed');
        console.error(err);
      }
    });
  }
     goBack(): void 
     {
    this.location.back();
     }
}
