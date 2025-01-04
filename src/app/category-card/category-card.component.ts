import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TimeEntryDialogComponent } from '../time-entry-dialog/time-entry-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() categoryName?: string;
  @Input() hours?: number;
  @Input() minutes?: number;
  @Input() categoryId: string | null = null;

  readonly dialog = inject(MatDialog);

  @Output() timeEntrySavedEvent = new EventEmitter<boolean>();

  openTimeEntryDialog() {
    const dialogRef = this.dialog.open(TimeEntryDialogComponent, {
      data: {categoryId: this.categoryId},
    });

    dialogRef.afterClosed().subscribe(entitySaved => {
      if (entitySaved) this.timeEntrySavedEvent.emit(true);
    })
  }
}
