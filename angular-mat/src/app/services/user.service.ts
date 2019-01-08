import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:3000';  // URL to web api
  isLoggedIn = false;
  currentUser: User;

  constructor(private http: HttpClient) { }

  checkEmail(email: string): Observable<any> {
    return this.http.get(this.apiUrl + '/checkemail?email=' + email, httpOptions);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/adduser', user, httpOptions);
  }

  getUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', user, httpOptions).map(
      res => {
        if (res.status === 200) {
          this.isLoggedIn = true;
          this.currentUser = res.data;
          return res;
        }else {
          return res;
        }
      },
      err => {
        console.log("Error in sending request");
      }
    );
  }

  logout(id) : Observable<any> {
    return this.http.get(this.apiUrl + '/logout?id=' + id, httpOptions);
  }
}
