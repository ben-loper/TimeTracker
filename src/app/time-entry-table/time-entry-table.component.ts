import {AfterViewInit, Component, Input, OnInit, ViewChild, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TimeEntryDto } from '../../models/TimeEntryDto';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-time-entry-table',
  standalone: true,
  styleUrl: 'time-entry-table.component.css',
  templateUrl: 'time-entry-table.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, MatIconModule, MatProgressSpinner, CommonModule],
})
export class TimeEntryTableComponent implements AfterViewInit, OnInit {
  loading: boolean = true;
  displayedColumns: string[] = ['date', 'hours', 'minutes', 'actions'];
  @Input() timeEntries: TimeEntryDto[] = [];
  dataSource: MatTableDataSource<TimeEntryDto>;

  categoryId: string | null = null;

  route = inject(ActivatedRoute);
  categoryService = inject(CategoryService);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.timeEntries);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');

      if (this.categoryId) {
        this.categoryService.getTimeEntriesForCategory(this.categoryId).subscribe({
          next: timeEntries => {
            if (timeEntries) {
              this.timeEntries = timeEntries;
              this.dataSource = new MatTableDataSource(this.timeEntries);
              this.loading = false;
            }
          }
        });
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
