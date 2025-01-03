import { Injectable } from '@angular/core';
import { CategoryDto } from '../models/CategoryDto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly key = 'categories';

  constructor() { }

  public getCategories(): Observable<CategoryDto[] | undefined> {
    return of(undefined);
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

    return of (undefined);
  }
}
