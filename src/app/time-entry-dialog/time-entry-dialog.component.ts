import { Component, inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { TimeEntryDto } from '../../models/TimeEntryDto';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-time-entry-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  templateUrl: './time-entry-dialog.component.html',
  styleUrl: './time-entry-dialog.component.css'
})
export class TimeEntryDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<TimeEntryDialogComponent>);
  readonly categoryService = inject<CategoryService>(CategoryService);
  readonly data = inject<TimeEntryDialogData>(MAT_DIALOG_DATA);

  @Input() hours: number = 0;
  @Input() minutes: number = 0;
  @Input() date: Date = new Date();


  ngOnInit(): void {
    this.date = new Date();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): boolean {
    let entitySaved = false;
    if (!this.data.categoryId) return entitySaved;

    if ((this.hours > 0 || this.minutes > 0) && this.date) {
      let timeEntry = new TimeEntryDto(null, this.hours, this.minutes, this.date);

      this.categoryService.addTimeEntry( this.data.categoryId, timeEntry).subscribe({
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