import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Service, Postulante } from '../../service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
import { Applicant } from 'src/app/auth/user';
import { workerItemComponent } from '../../components/worker-item/worker-item.component';
@Component({
  selector: 'app-postulate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ServiceItemComponent,
    workerItemComponent,
  ],
  templateUrl: './postulate.component.html',
  styleUrls: ['./postulate.component.scss'],
})
export class PostulateComponent implements OnInit {
  form!: FormGroup;
  postulate!: Postulante;
  service!: Service;
  applicants!: Applicant[];

  price: Number = 0;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private serviceService = inject(ServiceService);
  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.serviceService.getApplicants(params['serviceId']).subscribe(
        (res: Applicant[]) => {
          // El servicio es correcto y pueden ser traídos los postulantes
          this.applicants = res;
          console.log(this.applicants.length);
        },
        (error: any) => {
          //Algún error al obtener el servicio
          console.error('ERROR obteniendo los postulantes ', error.message);
        }
      )
    );
    this.route.params.subscribe((params) =>
      this.serviceService.getService(params['serviceId']).subscribe(
        (res: Service) => {
          // El servicio es correcto y puede er renderizado
          this.service = res;
          console.log(this.service);
        },
        (error: any) => {
          //Algun error al obtener el servicio
          console.error('ERROR obteniendo el servicio ', error.message);
        }
      )
    );

    this.form = new FormGroup({
      price: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }
  submit(): void {
    if (
      Number(this.form.value.price) > this.service.price_max ||
      Number(this.form.value.price) < this.service.price_min
    ) {
      window.alert(
        'debe proporcionar una propuesta dentro del rango establecido.'
      );
    } else {
      this.postulate = {
        price: Number(this.form.value.price),
      };
      this.serviceService
        .postulateService(this.service, this.postulate)
        .subscribe({
          next: (res) => {
            this.router.navigateByUrl('/worker');
          },
          error: (error) => {
            //Algun error al postularse
            console.error('ERROR al postularse ', error.message);
          },
        });
    }
  }
}
