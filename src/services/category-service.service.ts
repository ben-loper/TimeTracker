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
}
