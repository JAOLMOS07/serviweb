import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Service, Rate } from '../../service';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileComponent } from '../../components/profile/profile.component';
import { User } from 'src/app/auth/user';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ServiceItemComponent,
  ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  service!: Service;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private serviceService = inject(ServiceService);
  form!: FormGroup;

  ngOnInit(): void {
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
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit(): void {}
}
