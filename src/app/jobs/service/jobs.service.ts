import { Injectable } from '@angular/core';
import { Jobs } from '../../entity/Jobs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private baseUrl = 'http://localhost:8080/jobs';

  constructor(private http: HttpClient) { }

  criarTrabalhos(trabalho: Jobs): Observable<Jobs> {
    return this.http.post<Jobs>(this.baseUrl, trabalho);
  }

  obterTrabalhos(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(this.baseUrl);
  }

  atualizarTrabalhos(id: number, trabalho: Jobs): Observable<Jobs> {
    return this.http.put<Jobs>(`${this.baseUrl}/${id}`, trabalho);
  }

  toggleTrabalhos(id: number): Observable<Jobs> {
    return this.http.patch<Jobs>(`${this.baseUrl}/${id}/available`, {});
  }

  deletetarTrabalhor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
