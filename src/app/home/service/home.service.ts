import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Card } from '../../entity/Card';
import { UserRoles } from '../../entity/UserRoles';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

    private baseUrl = `${environment.apiUrl}/home/cards`;

    constructor(private http: HttpClient) { }

    getCardsByRole(role: UserRoles, userId: number): Observable<Card[]> {
      return this.http.get<Card[]>(`http://localhost:8080/home/cards/role?role=${role}&userId=${userId}`);
    }

}
