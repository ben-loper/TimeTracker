import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryDto } from '../../models/CategoryDto';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { CategoryService } from '../../services/category-service.service';


@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CategoryModalComponent>);
  data = inject<CategoryDto>(MAT_DIALOG_DATA);

  readonly categoryService = inject<CategoryService>(CategoryService);

  categoryName = model(undefined);

  ngOnInit(): void {
    if (this.data.id) {
      this.categoryService.getCategoryById(this.data.id).subscribe({
        next: (category) => {
          if (category){
            this.data.id = category.id;
            this.data.name = category.name;
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
    if (this.data.name) {
      const category = new CategoryDto(this.data.name, this.data.id);

      this.categoryService.saveCategory(category).subscribe({
        next: () => this.dialogRef.close(),
        error: (err) => console.log(err)
      });
    }
  }
}
