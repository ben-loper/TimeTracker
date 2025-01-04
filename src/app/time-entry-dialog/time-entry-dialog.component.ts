import { Component, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryDto } from '../../models/CategoryDto';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { TimeEntryDto } from '../../models/TimeEntryDto';

@Component({
  selector: 'app-time-entry-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './time-entry-dialog.component.html',
  styleUrl: './time-entry-dialog.component.css'
})
export class TimeEntryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TimeEntryDialogComponent>);
  readonly categoryService = inject<CategoryService>(CategoryService);
  readonly data = inject<TimeEntryDialogData>(MAT_DIALOG_DATA);

  @Input() hours: number = 0;
  @Input() minutes: number = 0;

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): boolean {
    let entitySaved = false;
    if (!this.data.categoryId) return entitySaved;

    if (this.hours > 0 || this.minutes > 0) {
      let timeEntry = new TimeEntryDto(null, this.hours, this.minutes);

      this.categoryService.saveTimeEntry(timeEntry, this.data.categoryId).subscribe({
        next: (savedItem) => {
          if (savedItem){
            entitySaved = true;
          }
          
          this.dialogRef.close(savedItem)
        },
        error: (err) => console.log(err)
      })
    }

    return entitySaved;
  }
}


export interface TimeEntryDialogData {
  categoryId: string
}