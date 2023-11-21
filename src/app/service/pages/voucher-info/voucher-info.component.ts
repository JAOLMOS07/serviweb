import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Service, Voucher } from '../../service';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-voucher-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ServiceItemComponent],
  templateUrl: './voucher-info.component.html',
  styleUrls: ['./voucher-info.component.scss'],
})
export class VoucherInfoComponent implements OnInit {
  form!: FormGroup;
  voucher!: Voucher;
  service!: Service;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private serviceService = inject(ServiceService);

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.serviceService.getVoucher(params['serviceId']).subscribe(
        (res: Voucher) => {
          // El servicio es correcto y el voucher puede ser renderizado
          this.voucher = res;
        },
        (error: any) => {
          //Algun error al obtener el servicio
          console.error('ERROR obteniendo el voucher de pago ', error.message);
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
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      transaction_number: new FormControl('',[Validators.required]),
      price: new FormControl('', [Validators.required]),
      confirmed: new FormControl('', [Validators.requiredTrue]),
      banck_id: new FormControl('', [Validators.required]),
      service_id: new FormControl('', [Validators.required]),


    });
  }

  get f() {
    return this.form.controls;
  }
  submit(): void {}
}
