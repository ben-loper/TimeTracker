import { Injectable } from '@angular/core';
import { CategoryDto } from '../models/CategoryDto';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CategoryVM } from '../models/CategoryVM';


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
    return of (undefined);
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

    localStorage.setItem(this.key, JSON.stringify(categoriesJson));

    return of(categoryToSave);
  }

  public convertCategoryDtosToVm(categories: CategoryDto[]) : CategoryVM[] {
    const viewModels: CategoryVM[] = [];
    categories.forEach(category => viewModels.push(this.convertCategoryDtoToVm(category)));

    return viewModels;
  }

  public convertCategoryDtoToVm(category: CategoryDto) : CategoryVM {
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
