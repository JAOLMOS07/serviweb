import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Credentials, Token, User,RegisterCredentials } from '../../user';
import { Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form!: FormGroup;
  pass: string = '';
  passR: string = '';
  credentials!: RegisterCredentials;

  constructor(private authService: AuthService,private router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(this.pass, [Validators.required]),
      passwordR: new FormControl(this.passR, [Validators.required]),
    });

  }
  get f() {
    return this.form.controls;
  }

  submit() {
    if (!this.validatePassword()) {
      this.credentials = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.authService.Register(this.credentials).subscribe((res: Token) => {
        this.authService.setToken(res);
        this.router.navigateByUrl('user/client');
      },
      (error: any) => {
        if (error.status === 400) {
          console.error('ERROR 400 Usuario no válido para registrar.', error.message);
          window.alert("Usuario no válido para registrar.");
        }
      });

    }
  }

  validatePassword(): Boolean {
    return this.pass !== this.passR;
  }
}
