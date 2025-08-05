import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  // ✅ Correct file name
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  login()
 {
    if (!this.username || !this.password)
    {
      this.errorMessage = 'Username and password required';
      return;
    }

      this.api.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); // ✅ Save token
        this.router.navigate(['/student']); // ✅ Navigate
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
