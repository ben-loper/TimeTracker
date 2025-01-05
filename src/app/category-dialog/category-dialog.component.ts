import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CategoryDto } from '../../models/CategoryDto';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css'
})
export class CategoryDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CategoryDialogComponent>);

  readonly categoryService = inject<CategoryService>(CategoryService);

  @Input() categoryName?: string;
  @Input() categoryId: string | null = null;

  ngOnInit(): void {
    if (this.categoryId) {
      this.categoryService.getCategoryById(this.categoryId).subscribe({
        next: (category) => {
          if (category){
            this.categoryId = category.id;
            this.categoryName = category.name;
          }
        },
        error: (err) => console.log(err)
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.categoryName) {
      const category = new CategoryDto(this.categoryName, this.categoryId);

      this.categoryService.saveCategory(category).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.log(err)
      });
    }
  }
}
