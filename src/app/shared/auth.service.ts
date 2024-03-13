import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// User interface
export class User {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  }

  // Access user profile
  userData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user');
  }

  edit(user, oldEmail: string): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('name', user.name.toString());
    httpParams = httpParams.append('email', user.email.toString());
    if (user.weight === null || user.weight === undefined)
    {
      user.weight = 0;
    }
    httpParams = httpParams.append('weight', user.weight.toString());
    httpParams = httpParams.append('gender', user.gender.toString());
    httpParams = httpParams.append('oldEmail', oldEmail.toString());
    httpParams = httpParams.append('weightType', user.weightType.toString());
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };
    return this.http.post('http://127.0.0.1:8000/api/auth/edit', httpParams, options);
  }

}
