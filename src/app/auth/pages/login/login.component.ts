import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Credentials, Token, User } from '../../user';
import { Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  form!: FormGroup;
  credentials!: Credentials;
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    this.credentials = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(this.credentials).subscribe((res: Token) => {
      // El inicio de sesión fue exitoso, manejamos la respuesta
      this.authService.setToken(res);
      this.router.navigateByUrl('/client');
    });
  }
}
