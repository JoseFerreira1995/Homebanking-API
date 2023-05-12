import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBalance(token: string): Observable<any> {
    const url = `${this.baseUrl}/transactions`;
    const headers = this.getAuthHeaders();
    return this.http.get(url, { headers });
  }

  deposit(amount: number): Observable<any> {
    const url = `${this.baseUrl}/add-money`;
    const headers = this.getAuthHeaders();
    return this.http.put(url, { amount }, { headers });
  }

  withdraw(amount: number): Observable<any> {
    const url = `${this.baseUrl}/withdraw-money`;
    const headers = this.getAuthHeaders();
    console.log(
      '🚀 ~ file: api.service.ts:29 ~ ApiService ~ withdraw ~ url:',
      url
    );
    return this.http.delete(url, { headers, body: { amount } });
  }

  getTransactions(): Observable<any> {
    const url = `${this.baseUrl}/transactions`;
    const headers = this.getAuthHeaders();
    return this.http.get(url, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(
      '🚀 ~ file: api.service.ts:41 ~ ApiService ~ getAuthHeaders ~ token:',
      token
    );
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
  }
}
