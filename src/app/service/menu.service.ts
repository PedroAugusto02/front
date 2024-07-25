import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../side-nav/interfaces/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menusSubject = new BehaviorSubject<Menu[]>([]);
  menus$ = this.menusSubject.asObservable();
  private baseUrl = `${environment.apiUrl}/usuarios/menus`;

  constructor(private http: HttpClient) {}

  loadUserMenus(): void {
    this.http.get<Menu[]>(this.baseUrl).subscribe(menus => {
      this.menusSubject.next(menus);
    });
  }

  getUserMenus(): Observable<Menu[]> {
    return this.menus$;
  }
}
