import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Service } from '../service';
import { AuthService } from 'src/app/auth/services/auth.service';
@Injectable()
export class ServiceService {
  //dirección http base de mi API
  private apiURL = 'http://apiserviapp.test/api/v1/service/';

  //Headers de mi peticion http
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  //Petición GET para obtener la lista de servicios del cliente actual---------------------------
  getServices(): Observable<Service[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Service[]>(this.apiURL + 'getservicesclient', this.httpOptions)
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
