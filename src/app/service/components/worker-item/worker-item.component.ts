import { Component,Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Applicant } from 'src/app/auth/user';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-worker-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.scss']
})
export class workerItemComponent {
@Input() applicant!:Applicant;
@Input() context!:number;

@Output() applicantEvent = new EventEmitter<Applicant>();

SelectApplicant(applicant:Applicant):void{
  this.applicantEvent.emit(applicant)
}
}
