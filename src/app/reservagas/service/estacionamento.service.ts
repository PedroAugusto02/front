import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estacionamento } from '../../entity/Estacionamento';


@Injectable({
  providedIn: 'root'
})
export class EstacionamentoService {

  private baseUrl = 'http://localhost:8080/estacionamentos';

  constructor(private http: HttpClient) { }

  criarEstacionamento(estacionamento: Estacionamento): Observable<Estacionamento> {
    return this.http.post<Estacionamento>(this.baseUrl, estacionamento);
  }

  listarEstacionamentos(): Observable<Estacionamento[]> {
    return this.http.get<Estacionamento[]>(this.baseUrl);
  }

  atualizarEstacionamento(id: number, estacionamento: Estacionamento): Observable<Estacionamento> {
    return this.http.put<Estacionamento>(`${this.baseUrl}/${id}`, estacionamento);
  }

  deletarEstacionamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
