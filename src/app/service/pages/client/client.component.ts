import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../components/profile/profile.component';
import { User } from 'src/app/auth/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../service';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ProfileComponent,ServiceItemComponent, RouterModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  user!: User;
  services!: Service[];
  router = inject(Router);
  authService = inject(AuthService);
  serviceService = inject(ServiceService);


  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (res: User) => {
        // El inicio de sesión fue exitoso, manejamos la respuesta
        this.user = res;
      },
      (error: any) => {
        //Algún error al obtener el usuario
        console.error('ERROR obteniendo el usuario ', error.message);
      }
    );
    this.serviceService.getServices().subscribe(
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

  SelectService(service:Service):void{
    this.router.navigateByUrl('/client/applicants/'+service.id);
    console.log(this.services.indexOf(service))

  }
}
