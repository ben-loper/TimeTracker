import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CategoryVM } from '../../models/CategoryVM';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  readonly categoryService = inject(CategoryService);

  categoryViewModels: CategoryVM[] | null = null;

  ngOnInit(): void {
    this.getCategories();
  }

  openCategoryDialog(id: string | undefined = undefined, categoryName: string | undefined = undefined) : void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {id: id, categoryName: categoryName},
    });
   
    dialogRef.afterClosed().subscribe(categoryUpdated => {
      if (categoryUpdated) this.getCategories();
    })
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        if (categories) {
          this.categoryViewModels = this.categoryService.convertCategoryDtosToVm(categories);
        }
      },
      error: (err) => console.log(err)
    });
  }

  timeEntrySaved(entitySaved: boolean) {
    if (entitySaved) this.getCategories();
  }
}
