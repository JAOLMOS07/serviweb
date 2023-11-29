import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from 'src/app/category/category.component';
import { Category } from 'src/app/category/Category';

import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Token,RegisterCredentials } from '../../user';
import { Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,CategoryComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  pass: string = '';
  passR: string = '';
  workerSelected: boolean = false;
  credentials!: RegisterCredentials;
  categoriesSelected:Category[] = [] ;
  private authService = inject(AuthService)
  private router = inject(Router)

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordR: new FormControl('', [Validators.required]),
      /* workerCheck: new FormControl(this.workerSelected,Validators.requiredTrue) */
    });

  }
  get f() {
    return this.form.controls;
  }

  changeWorker():void{
    this.workerSelected = !this.workerSelected;
  }

  submit() {
    if (!this.validatePassword()) {
      if(!this.workerSelected){
        this.credentials = {
          name: this.form.value.name,
          email: this.form.value.email,
          password: this.form.value.password,
          phone: this.form.value.phone,
          role_id:1,
          categories:null
        };
        this.authService.Register(this.credentials).subscribe((res: Token) => {
          this.authService.setToken(res);
          this.router.navigateByUrl('client');

        },
        (error: any) => {
          if (error.status === 400) {
            console.error('ERROR 400 Usuario no válido para registrar.', error.message);
            window.alert("Usuario no válido para registrar.");
          }
        });

      }else{
        if(this.categoriesSelected.length > 0){
          this.credentials = {
            name: this.form.value.name,
            email: this.form.value.email,
            password: this.form.value.password,
            phone:this.form.value.phone,
            role_id:2,
            categories:this.getCategoryIds(this.categoriesSelected)
          };
          this.authService.Register(this.credentials).subscribe((res: Token) => {
            this.authService.setToken(res);
           this.router.navigateByUrl('client');

          },
          (error: any) => {
            if (error.status === 400) {
              console.error('ERROR 400 Usuario no válido para registrar.', error.message);
              window.alert("Usuario no válido para registrar.");
            }
          });
        }else{
          window.alert("Si desea ser trabajador debe seleccionar al menos una categoría")
        }
      }

    }
  }

  CategorySelected(categories:Category[]):void{
    this.categoriesSelected = categories;

  }

  validatePassword(): Boolean {
    return this.form.value.password !== this.form.value.passwordR;
  }

  getCategoryIds(categories: Category[]): number[] {
    return categories.map((category) => category.id);
  }
}
