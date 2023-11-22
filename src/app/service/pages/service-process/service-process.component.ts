import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Service, Rate } from '../../service';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileComponent } from '../../components/profile/profile.component';
import { User } from 'src/app/auth/user';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-service-process',
  standalone: true,
  imports: [
    CommonModule,
    ServiceItemComponent,
    ProfileComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './service-process.component.html',
  styleUrls: ['./service-process.component.scss'],
})
export class ServiceProcessComponent implements OnInit {
  service!: Service;
  user!: User;
  rate!: Rate;
  context:number=3;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private serviceService = inject(ServiceService);
  form!: FormGroup;

  ngOnInit(): void {

    this.route.params.subscribe((params) =>
      this.serviceService.getUserContact(params['serviceId']).subscribe(
        (res: User) => {
          // El servicio es correcto y puede er renderizado
          this.user = res;

        },
        (error: any) => {
          //Algun error al obtener el servicio
          console.error('ERROR obteniendo el servicio ', error.message);
        }
      )
    );
    this.route.params.subscribe((params) =>
      this.serviceService.getService(params['serviceId']).subscribe(
        (res: Service) => {
          // El servicio es correcto y el usuario puede ser renderizado
          this.service = res;

        },
        (error: any) => {
          //Algun error al obtener el servicio
          console.error('ERROR obteniendo el servicio ', error.message);
        }
      )
    );
    this.route.params.subscribe((params) =>
      this.serviceService.getRate(params['serviceId']).subscribe(
        (res: Rate) => {
          // El servicio es correcto y el usuario puede ser renderizado
          this.rate = res;
          console.log(this.rate)
        },
        (error: any) => {
          //Algun error al obtener el servicio
          console.error('ERROR obteniendo el servicio ', error.message);
        }
      )
    );

    this.form = new FormGroup({
      rate: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }
  submit(): void {

  }
}
