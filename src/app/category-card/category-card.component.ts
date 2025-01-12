import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TimeEntryDialogComponent } from '../time-entry-dialog/time-entry-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CategoryService } from '../../services/category.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, RouterModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() categoryName?: string;
  @Input() hours?: number;
  @Input() minutes?: number;
  @Input() categoryId: string | null = null;

  readonly dialog = inject(MatDialog);
  readonly categoryService = inject(CategoryService);

  @Output() entitySavedEvent = new EventEmitter<boolean>();

  openTimeEntryDialog() {
    const dialogRef = this.dialog.open(TimeEntryDialogComponent, {
      data: {categoryId: this.categoryId},
    });

    dialogRef.afterClosed().subscribe(entitySaved => {
      if (entitySaved) this.entitySavedEvent.emit(true);
    })
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {categoryId: this.categoryId},
    });

    dialogRef.afterClosed().subscribe(entitySaved => {
      if (entitySaved) this.entitySavedEvent.emit(true);
    })
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {id: this.categoryId, resourceName: this.categoryName},
    });

    dialogRef.afterClosed().subscribe(entitySaved => {
      if (entitySaved) {
        if (this.categoryId)
        this.categoryService.deleteCategory(this.categoryId).subscribe({
          next: () => this.entitySavedEvent.emit(true),
          error: (err) => {throw new Error(err)}
        });
      };
    })
  }
}
