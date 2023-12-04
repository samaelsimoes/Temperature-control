import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './interface/user';
import { ConfigGlobalUrl } from 'app/global/ConfigGlobalURL';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    link: string;
    private subjUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    currentUser: User | null = null;

    constructor(
        private http: HttpClient,
        private url: ConfigGlobalUrl
    ) {
        this.link = this.url.getApiUrl();
    }

    register(user: User): Observable<User> {
        return this.http.post<any>(`${this.link}oapi/signup`, user);
    }

    login(credentials: { login: string, password: string }): Observable<User> {
        debugger;
        console.log(credentials)
        const httpOptions = {
            headers: new HttpHeaders({
              'username': 'user',
              'password': 'password'
            })
          };
          return this.http.get<any>(`${this.link}login?username=${credentials.login}&password=${credentials.password}`, httpOptions);
    }

    getSwaggerAPI(api: string): Observable<string>{
      return this.http.get<any>(`${this.link}/${api}`)
    }

    isAuthenticated(): Observable<boolean> {
        return this.subjLoggedIn$.asObservable();
    }

    getUser(): Observable<User | null> {
        return this.subjUser.asObservable();
    }
}
