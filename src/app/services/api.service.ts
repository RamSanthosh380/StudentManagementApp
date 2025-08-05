import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7075/api'; // ✅ Your base API URL

  constructor(private http: HttpClient) {}

  // ✅ Login Method
  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password
    };
    return this.http.post(`${this.apiUrl}/Auth/login`, loginData);
  }

  // ✅ Optional: Get token for Authorization header
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
