import { Component, inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
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
  data = inject<DialogData>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.categoryId) {
      this.categoryService.getCategoryById(this.data.categoryId).subscribe({
        next: (category) => {
          if (category){
            this.data.categoryId = category.id;
            this.data.categoryName = category.name;
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
    if (this.data.categoryName) {
      if (this.data.categoryId) {
        this.categoryService.updateCategoryName(this.data.categoryId, this.data.categoryName).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.log(err)
        });
      } else {
        const category = new CategoryDto(this.data.categoryName, this.data.categoryId);
        this.categoryService.createCategory(category).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.log(err)
        });
      }
    }
  }
}

export interface DialogData {
  categoryId: string | null;
  categoryName: string;
}
