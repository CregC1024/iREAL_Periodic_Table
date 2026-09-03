import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Element } from './element.model';

@Injectable({ providedIn: 'root' })
export class ElementService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>(`${this.base}/elements`);
  }

  getElement(key: string | number): Observable<Element> {
    return this.http.get<Element>(`${this.base}/elements/${key}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/categories`);
  }
}
