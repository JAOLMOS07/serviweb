import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../components/profile/profile.component';
import { User } from 'src/app/auth/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../service';
import { ServiceItemComponent } from '../../components/service-item/service-item.component';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ProfileComponent,ServiceItemComponent],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  user!: User;
  services!: Service[];

  authService = inject(AuthService);
  serviceService = inject(ServiceService);
  constructor() {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (res: User) => {
        // El inicio de sesión fue exitoso, manejamos la respuesta
        this.user = res;
      },
      (error: any) => {
        //Algun error al obtener el usuario
        console.error('ERROR obteniendo el usuario ', error.message);
      }
    );
    this.serviceService.getServices().subscribe(
      (res: Service[]) => {
        this.services = res;
        console.log(this.services);
      },
      (error: any) => {
        //Algun error al obtener los servicios
        console.error('ERROR en los servicios ', error.message);
      }
    );
  }
}
