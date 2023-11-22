import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../service';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,ServiceItemComponent, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{
  services!: Service[];
  router = inject(Router);
  serviceService = inject(ServiceService);
  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe(
      (res: Service[]) => {
        this.services = res;
        console.log(this.services);
      },
      (error: any) => {
        //Algún error al obtener los servicios
        console.error('ERROR en los servicios ', error.message);
      }
    );
  }

  SelectServiceVoucher(service:Service):void{
    this.router.navigateByUrl('/client/voucher/'+service.id);
  }
  SelectServiceProceso(service:Service):void{
    this.router.navigateByUrl('/client/proceso/'+service.id);

  }
  SelectServiceReport(service:Service):void{
    this.router.navigateByUrl('/client/report/'+service.id);

  }
}
