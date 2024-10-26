import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserRoles } from '../../../model/UserRoles';
import { Card } from '../../../model/Card';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

    public baseUrl = `${environment.apiUrl}/home/cards`;

    constructor(private http: HttpClient) { }

    getCardsByRole(role: UserRoles, userId: number): Observable<Card[]> {
      const url = `${this.baseUrl}/role?role=${role}&userId=${userId}`;
      return this.http.get<Card[]>(url);
    }

}
