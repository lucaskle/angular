import { Injectable, signal, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  private readonly categories$ = this.httpClient.get<Category[]>(
    `${this.apiUrl}/categories`
  );

  public categories = toSignal(this.categories$, {
    initialValue: [] as Category[],
  });

  // public getCategories(): Observable<Category[]> {
  //   return this.httpClient
  //     .get<Category[]>(`${this.apiUrl}/categories`)
  //     .pipe(tap(categories => this.categories.set(categories)));
  // }
}
