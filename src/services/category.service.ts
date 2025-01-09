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
    if (!id) throw new Error(`Category does not exist for ${id}`);

    let savedCategories: CategoryDto[] | undefined = [];

    this.getCategories().subscribe({
      next: (categories) => {
        savedCategories = categories;
      },
      error: (err) => console.log(err)
    });

    return of(savedCategories.find(category => category.id == id));
  }

  public createCategory(category: CategoryDto): Observable<CategoryDto | undefined> {
    let stringCategories = localStorage.getItem(this.key);

    if (!stringCategories) {
      stringCategories = JSON.stringify([]);
      localStorage.setItem(this.key, stringCategories);
    }

    const categoriesJson: CategoryDto[] = JSON.parse(stringCategories);

    let categoryToSave = categoriesJson.find(savedCategory => savedCategory.id == category.id);

    if (categoryToSave) throw new Error(`Category already exists for categoryId ${category.id}`);

    categoryToSave = new CategoryDto(category.name, uuidv4());
    categoriesJson.push(categoryToSave);
    
    localStorage.setItem(this.key, JSON.stringify(categoriesJson));

    return of(categoryToSave);
  }

  public updateCategoryName(categoryId: string, newName: string): Observable<CategoryDto | undefined> {
    let savedCategories: CategoryDto[] | undefined = [];

    this.getCategories().subscribe({
      next: (categories) => {
        savedCategories = categories;
      },
      error: (err) => console.log(err)
    });

    if (!savedCategories) throw new Error('No categories in storage');

    let categoryToSave = savedCategories.find(category => category.id == categoryId);

    if (!categoryToSave) throw new Error(`Category does not exist for ${categoryId}`);

    categoryToSave.name = newName;

    localStorage.setItem(this.key, JSON.stringify(savedCategories));

    return of(categoryToSave);
  }

  public deleteCategory(categoryId: string): Observable<boolean> {
    let savedCategories: CategoryDto[] | undefined = [];

    this.getCategories().subscribe({
      next: (categories) => {
        savedCategories = categories;
      },
      error: (err) => console.log(err)
    });

    if (!savedCategories) throw new Error('No categories in storage');

    let categoryToDelete = savedCategories.find(category => category.id == categoryId);

    if (!categoryToDelete) throw new Error(`Category does not exist for ${categoryId}`);

    const index = savedCategories.indexOf(categoryToDelete);

    savedCategories.splice(index, 1);

    localStorage.setItem(this.key, JSON.stringify(savedCategories));

    return of(true);
  }

  public addTimeEntry(categoryId: string, timeEntry: TimeEntryDto): Observable<CategoryDto | undefined> {
    let savedCategories: CategoryDto[] | undefined = [];

    this.getCategories().subscribe({
      next: (categories) => {
        savedCategories = categories;
      },
      error: (err) => console.log(err)
    });

    if (!savedCategories) throw new Error('No categories in storage');

    let categoryToSave = savedCategories.find(category => category.id == categoryId);

    if (!categoryToSave) throw new Error(`Category does not exist for ${categoryId}`);

    timeEntry.hours += Math.floor(timeEntry.minutes / 60);
    timeEntry.minutes = timeEntry.minutes % 60;

    categoryToSave.timeEntries.push(timeEntry);

    localStorage.setItem(this.key, JSON.stringify(savedCategories));

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
}
