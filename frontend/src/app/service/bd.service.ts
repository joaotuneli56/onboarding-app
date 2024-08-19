import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, senha });
  }

  register(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { nome, email, senha });
  }
}
