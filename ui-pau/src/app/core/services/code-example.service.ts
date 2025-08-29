import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CodeExampleService {
  apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getExample(component: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/codigos/${component}`);
  }
} 