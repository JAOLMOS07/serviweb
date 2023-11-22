import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Applicant } from 'src/app/auth/user';
import { ServiceService } from '../../services/service.service';
import { Service, Voucher } from '../../service';
import { workerItemComponent } from '../../components/worker-item/worker-item.component';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-applicants',
  standalone: true,
  imports: [CommonModule, workerItemComponent, ServiceItemComponent],
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss'],
})
export class ViewApplicantsComponent implements OnInit {
  applicants!: Applicant[];
  service!: Service;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private serviceService = inject(ServiceService);
  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.serviceService.getApplicants(params['serviceId']).subscribe(
        (res: Applicant[]) => {
          // El servicio es correcto y puede er renderizado
          this.applicants = res;
          console.log(this.applicants);
        },
        (error: any) => {
          //Algun error al obtener el servicio
          console.error('ERROR obteniendo los aplicantes ', error.message);
        }
      )
    );
    this.route.params.subscribe((params) =>
      this.serviceService.getService(params['serviceId']).subscribe(
        (res: Service) => {
          // El servicio es correcto y puede er renderizado
          this.service = res;
        },
        (error: any) => {
          //Algun error al obtener el servicio
          console.error('ERROR obteniendo el servicio ', error.message);
        }
      )
    );
  }

  SelectApplicant(applicant: Applicant): void {
    this.serviceService.acceptApplicants(this.service, applicant).subscribe(
      (res:Voucher) => {

        this.router.navigateByUrl('/client/voucher/'+res.id);
      },
      (error:any) => {
        console.error('ERROR al acceptar el aplicante ', error.message);
      }
    );
  }
}
