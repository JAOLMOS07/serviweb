import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Service, CreateService, Postulante, Voucher, Rate, createRate } from '../service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Applicant, User } from 'src/app/auth/user';
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

  //Petición GET para obtener un servicio especifico---------------------------
  getService(serviceId: string): Observable<Service> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Service>(this.apiURL + 'getservice/' + serviceId, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
    //Petición GET para obtener un servicio especifico---------------------------
    getUserContact(serviceId: string): Observable<User> {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        }),
      };
      return this.http
        .get<User>(this.apiURL + 'getuserservice/' + serviceId, this.httpOptions)
        .pipe(catchError(this.errorHandler));
    }
  //Petición GET para obtener un servicio especifico---------------------------
  getApplicants(serviceId: string): Observable<Applicant[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Applicant[]>(
        this.apiURL + 'aplicants/' + serviceId,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
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
  //Petición GET para obtener la lista de servicios del cliente actual---------------------------
  getAllServicesWorker(): Observable<Service[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Service[]>(this.apiURL + 'getallservicesworker', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición GET para obtener la lista de servicios del cliente actual---------------------------
  getAllServices(): Observable<Service[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Service[]>(this.apiURL + 'getallservicesclient', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para enviar a verificar el voucher---------------------------

  toVerifyVoucher(voucher: Voucher): Observable<Voucher> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .post<Voucher>(this.apiURL + 'toverifyvoucher/'+voucher.id,voucher, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para enviar a verificar el voucher---------------------------

  rateService(rate:createRate): Observable<Rate> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .post<Rate>(this.apiURL + 'rateservice/'+rate.id,rate, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición GET para obtener el voucher de pago del servicio---------------------------
  getVoucher(serviceId: string): Observable<Voucher> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Voucher>(this.apiURL + 'getvoucher/'+serviceId, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición GET para obtener el voucher de pago del servicio---------------------------
  getRate(serviceId: string): Observable<Rate> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Rate>(this.apiURL + 'getrate/'+serviceId, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición GET para obtener la lista de servicios al que el trabajador puede postularse---------------------------
  getServicesOffers(): Observable<Service[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .get<Service[]>(this.apiURL + 'getoffers', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para crear un servicio---------------------------
  createService(service: CreateService): Observable<Service> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .post<Service>(this.apiURL + 'createservice', service, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para crear un servicio---------------------------
  acceptApplicants(
    service: Service,
    applicant: Applicant
  ): Observable<Voucher> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .post<Voucher>(
        this.apiURL + 'acceptaplicants/' + service.id,
        { worker_id: applicant.id },
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para que un trabajador se postule a un servicio---------------------------
  postulateService(
    service: Service,
    postulate: Postulante
  ): Observable<Service> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http
      .post<Service>(
        this.apiURL + 'postulate/' + service.id,
        postulate,
        this.httpOptions
      )
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
