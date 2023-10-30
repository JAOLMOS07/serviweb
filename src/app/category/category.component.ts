import { Component,inject,OnInit,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './services/category.service';
import { Category } from './Category';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit{
  categories!:Category[] ;
  @Output() CategoryEvent = new EventEmitter<Category[]>();

  categoriesSelected:Category[] = [] ;

categoryService = inject(CategoryService)
ngOnInit(): void {
  this.categoryService.getCategories().subscribe((res:Category[])=>{
    this.categories = res;

  })
}


addCategory(category:Category):void{
  if(!this.categoriesSelected.includes(category)){
    this.categoriesSelected.push(category)
  }else{
    let indice = this.categoriesSelected.indexOf(category)
    this.categoriesSelected.splice(indice,1)
  }
  this.CategoryEvent.emit(this.categoriesSelected)

}
}
