import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //url = 'http://localhost:3000/api/login';
  private url = "https://food-delivery-be-three.vercel.app";

  private tokenSubject: BehaviorSubject<string | null>;
  public token$: any;
  
  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('token');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token$ = this.tokenSubject.asObservable();
  }

  login(username: string, password: string) {

    const loginData = {
      username: username,
      password: password,
    };

    this.http.post(this.url+"/login", loginData).subscribe({
      next: (response: any) => {
        //this.errorMessage = "";
        localStorage.setItem('token', response.token);
        this.tokenSubject.next(response.token);
        console.log("Token: ", response.token);
      },
      error: (error) => {
        console.error('Login failed:', error);
        //this.errorMessage = error.error.error;
        //console.log(this.errorMessage);
      },
    });
  }

  
  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

}
