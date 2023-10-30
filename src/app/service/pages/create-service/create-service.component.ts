import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Service,CreateService } from '../../service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Category } from 'src/app/category/Category';
import { CategoryComponent } from 'src/app/category/category.component';
@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CategoryComponent],
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
})
export class CreateServiceComponent implements OnInit {
  form!: FormGroup;
  serviceService = inject(ServiceService);
  router = inject(Router);
  categoriesSelected: Category[] = [];
  service?: CreateService;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      price_min: new FormControl(0, [Validators.required]),
      price_max: new FormControl(0, [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit(): void {
    if (this.categoriesSelected.length > 0) {
      if (this.form.value.price_min > this.form.value.price_max) {
        alert('El precio mínimo debe ser menor o igual al precio maximo');
      } else {
        this.service = {
          name: this.form.value.name,
          description: this.form.value.description,
          price_min:this.form.value.price_min,
          price_max:this.form.value.price_max,
          date: new Date(),
          category: this.getCategoryIds(this.categoriesSelected)
        };

        this.serviceService.createService(this.service).subscribe((res:Service)=>{
          this.router.navigateByUrl('client');
        })
      }
    } else {
      alert('Debe seleccionar mínimo una categoría');
    }
  }

  CategorySelected(categories: Category[]): void {
    this.categoriesSelected = categories;
  }

  getCategoryIds(categories: Category[]): number[] {
    return categories.map((category) => category.id);
  }


}
