import { Component,Input, Output,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Applicant, UserInfo } from 'src/app/auth/user';
import { RatingModule } from 'primeng/rating';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-worker-item',
  standalone: true,
  imports: [CommonModule,RatingModule, FormsModule,TooltipModule],
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.scss']
})
export class workerItemComponent {
@Input() applicant!:Applicant;
@Input() context!:number;
authService = inject(AuthService);
calification:number=0;
services:number=0;

@Output() applicantEvent = new EventEmitter<Applicant>();
ngOnChanges(): void {
  if (this.applicant) {
    this.authService.getRateWorker(this.applicant.id).subscribe(
      (res: UserInfo) => {
        // El servicio es correcto y puede er renderizado
        this.calification = res.calificación;
        this.services = res.servicios;
      },
      (error: any) => {
        //Algun error al obtener el servicio
        console.error('ERROR obteniendo la calificación ', error.message);
      }
    );
  }}
SelectApplicant(applicant:Applicant):void{
  this.applicantEvent.emit(applicant)
}
}
