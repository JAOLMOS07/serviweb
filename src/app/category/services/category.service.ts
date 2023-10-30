import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../Category';
@Injectable()

export class CategoryService {

 //dirección http base de mi API
 private apiURL = 'http://apiserviapp.test/api/v1/';

 //Headers de mi peticion http
 httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
   }),
 };

 constructor(private http: HttpClient) {}

 //Petición GET para obtener la lista de servicios del cliente actual---------------------------
 getCategories(): Observable<Category[]> {
   this.httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
   };
   return this.http
     .get<Category[]>(this.apiURL + 'categories', this.httpOptions)
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
