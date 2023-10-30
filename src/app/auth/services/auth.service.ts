import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials, Token, User,status, RegisterCredentials } from '../user';

@Injectable()
export class AuthService {
  //dirección http base de mi API
  private apiURL = 'http://apiserviapp.test/api/v1/';

  //Headers de mi peticion http
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  //Tomar token del local storage----------------------------------------------------------------
  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '{}');
  }

  //Guardar token en el local storage------------------------------------------------------------
  setToken(token: Token): void {
    localStorage.setItem('token', JSON.stringify(token.token));
  }

  //Borrar local storage-------------------------------------------------------------------------
  deleteToken(): void {
    localStorage.removeItem('token');
  }

  //Petición GET para obtener el usuario que está con la sesión activa---------------------------
  getUser(): Observable<User> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      }),
    };
    return this.http
      .post<User>(this.apiURL + 'get-user', {token:this.getToken()}, this.httpOptions)
      .pipe(map((resp:any) => resp.user),catchError(this.errorHandler));
  }
//Petición GET para verificar el token-------------------------------------------------------------
validateToken(): Observable<boolean> {

  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    }),
  };
  return this.http
    .post(this.apiURL + 'validatetoken',  {token:this.getToken()}, this.httpOptions)
    .pipe(map((resp:any) => resp.status !== 'ok'),catchError(this.errorHandler));
}
  //Peición POST logout--------------------------------------------------------------------------
  logout(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      }),
    };
    return this.http
      .post<User>(this.apiURL + 'logout', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para iniciar sesión------------------------------------------------------------
  login(credentials: Credentials): Observable<Token> {
    return this.http
      .post<Token>(this.apiURL + 'login', credentials, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para Registrar usuario------------------------------------------------------------
  Register(credentials: RegisterCredentials): Observable<Token> {
    return this.http
      .post<Token>(this.apiURL + 'register', credentials, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para crear cliente------------------------------------------------------------

  CreateClient(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      }),
    };
    return this.http
      .post<any>(this.apiURL + 'client/createclient', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Petición POST para crear trabajador------------------------------------------------------------

  CreateWorker(credentials: RegisterCredentials): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      }),
    };
    return this.http
      .post<any>(this.apiURL + 'worker/createworker',credentials.categories, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Manipulador de errores-----------------------------------------------------------------------
  errorHandler(error: any) {
    let errorMessage = { status: null, message: null };
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = { status: error.status, message: error.message };
    }
    return throwError(errorMessage);
  }
}
