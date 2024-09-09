import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Menu } from '../screens/side-nav/interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menusSubject = new BehaviorSubject<Menu[]>([]);
  menus$ = this.menusSubject.asObservable();
  private baseUrl = `${environment.apiUrl}/usuarios/menus`;

  constructor(private http: HttpClient) {}

  loadUserMenus(): void {
    this.http.get<Menu[]>(this.baseUrl).subscribe({
      next: (result) => {
        this.menusSubject.next(result);
      }
    });
  }

  getUserMenus(): Observable<Menu[]> {
    return this.menus$;
  }
}
