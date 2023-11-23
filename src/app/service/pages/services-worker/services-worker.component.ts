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
  templateUrl: './services-worker.component.html',
  styleUrls: ['./services-worker.component.scss']
})
export class ServicesWorkerComponent implements OnInit{
  services!: Service[];
  router = inject(Router);
  serviceService = inject(ServiceService);
  ngOnInit(): void {
    this.serviceService.getAllServicesWorker().subscribe(
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


  SelectServiceProceso(service:Service):void{
    this.router.navigateByUrl('/worker/proceso/'+service.id);

  }
  SelectServiceReport(service:Service):void{
    this.router.navigateByUrl('/client/report/'+service.id);

  }
}
