import { Injectable } from '@angular/core';
import { CategoryDto } from '../models/CategoryDto';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CategoryVM } from '../models/CategoryVM';
import { TimeEntryDto } from '../models/TimeEntryDto';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly key = 'categories';

  constructor() { }

  public getCategories(): Observable<CategoryDto[] | undefined> {
    const stringCategories = localStorage.getItem(this.key);

    if (!stringCategories) return of(undefined);

    const categoriesJson: CategoryDto[] = JSON.parse(stringCategories);

    return of(categoriesJson);
  }

  public getCategoryById(id?: string): Observable<CategoryDto | undefined> {
    if (!id) return of(undefined);

    let savedCategories: CategoryDto[] | undefined = [];

    this.getCategories().subscribe({
      next: (categories) => {
        savedCategories = categories;
      },
      error: (err) => console.log(err)
    });

    return of(savedCategories.find(category => category.id == id));
  }

  public saveCategory(category: CategoryDto): Observable<CategoryDto | undefined> {
    let stringCategories = localStorage.getItem(this.key);

    if (!stringCategories) {
      stringCategories = JSON.stringify([]);
      localStorage.setItem(this.key, stringCategories);
    }

    const categoriesJson: CategoryDto[] = JSON.parse(stringCategories);

    let categoryToSave = categoriesJson.find(savedCategory => savedCategory.id == category.id);

    if (categoryToSave) {
      categoryToSave.name = category.name;
    }
    else {
      categoryToSave = new CategoryDto(category.name, uuidv4());
      categoriesJson.push(categoryToSave);
    }

    categoryToSave.timeEntries = category.timeEntries;

    localStorage.setItem(this.key, JSON.stringify(categoriesJson));

    return of(categoryToSave);
  }

  public convertCategoryDtosToVm(categories: CategoryDto[]): CategoryVM[] {
    const viewModels: CategoryVM[] = [];
    categories.forEach(category => viewModels.push(this.convertCategoryDtoToVm(category)));

    return viewModels;
  }

  public convertCategoryDtoToVm(category: CategoryDto): CategoryVM {
    let totalHours = 0;
    let totalMinutes = 0;

    category.timeEntries.forEach(timeEntry => {
      totalHours += timeEntry.hours;
      totalMinutes += timeEntry.minutes;
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return new CategoryVM(category.name, category.id, totalHours, totalMinutes);

  }

  public saveTimeEntry(timeEntry: TimeEntryDto, categoryId: string): Observable<TimeEntryDto | null> {
    let savedEntry: TimeEntryDto | null = null;

    if (!timeEntry || !categoryId) return of(savedEntry);

    let categoryToSave: CategoryDto | undefined;

    this.getCategoryById(categoryId).subscribe({
      next: (category) => {
        categoryToSave = category;
      },
      error: (err) => console.log(err)
    });

    if (!categoryToSave) return of(savedEntry);

    if (!timeEntry.id) {
      timeEntry.id = uuidv4();
    }

    timeEntry.hours += Math.floor(timeEntry.minutes / 60);
    timeEntry.minutes = timeEntry.minutes % 60;

    categoryToSave.timeEntries.push(timeEntry);

    this.saveCategory(categoryToSave).subscribe({
      next: (category) => {
        categoryToSave = category;
        savedEntry = timeEntry;
      },
      error: (err) => { throw new Error(err); }
    })

    return of(savedEntry);
  }
}
