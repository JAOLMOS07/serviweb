import { Component,OnInit,inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router, RouterModule} from '@angular/router';
import { UpdateCredentials, User } from 'src/app/auth/user';
@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent  implements OnInit{
  form!: FormGroup;
  credentials!: UpdateCredentials

  private authService = inject(AuthService)
  private router = inject(Router)
  ngOnChanges(): void{


  }
  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    });
    this.authService.getUser().subscribe(
      (res: User) => {
        // El inicio de sesión fue exitoso, manejamos la respuesta
        this.form.patchValue({
          name: res.name,
          phone: res.phone,
          email: res.email
        });
      },
      (error: any) => {
        //Algún error al obtener el usuario
        console.error('ERROR obteniendo el usuario ', error.message);
      }
    );

  }

  get f() {
    return this.form.controls;
  }

  submit():void{
    this.credentials = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone:this.form.value.phone,
    };
    this.authService.Update(this.credentials).subscribe((res: User) => {
     this.router.navigateByUrl('client');

    },
    (error: any) => {
      if (error.status === 400) {
        console.error('ERROR 400 Usuario no válido para registrar.', error.message);
        window.alert("Usuario no válido para registrar.");
      }
    });
  }
}
