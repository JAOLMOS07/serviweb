import { Injectable,inject,Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root',

})

export class SharingService {



  private sharingObservablePrivate: BehaviorSubject<Boolean> =
    new BehaviorSubject<Boolean>(Object.entries(JSON.parse(localStorage.getItem('token') || '{}')).length !== 0);
    get sharingObservable(){
      return this.sharingObservablePrivate.asObservable();
    }
    set sharingObservableData(session:Boolean){
      this.sharingObservablePrivate.next(session);
    }
}
