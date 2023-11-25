import { Component, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserInfo } from 'src/app/auth/user';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Service } from '../../service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() User!: User;
  @Input() Service!: Service;
  @Input() context!: number;
  authService = inject(AuthService);
  calification: number = 0;
  services: number = 0;
  title: string = '';
  /* @Output() profileEvent = new EventEmitter<any>(); */
  ngOnChanges(): void {
    if (this.User) {
      if (this.context === 1) {
        this.title = '-Cliente';
        this.authService.getRateClient(this.User.id).subscribe(
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
      } else if (this.context === 2) {
        this.title = '- Trabajador';

        this.authService.getRateWorker(this.User.id).subscribe(
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
      } else if (this.context === 3 && this.Service) {
        this.title = '- Contacto';
        if (this.User.id === this.Service.client_id) {
          this.title = '- Cliente';

          this.authService.getRateClient(this.User.id).subscribe(
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
        } else {
          this.title = '- Trabajador';

          this.authService.getRateWorker(this.User.id).subscribe(
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
        }
      }
    }
  }
  ngOnInit(): void {}
}
