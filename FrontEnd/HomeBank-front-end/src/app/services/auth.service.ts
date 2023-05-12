import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, { name, email, password });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}
