import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Estacionamento } from '../../../entity/Estacionamento';


@Injectable({
  providedIn: 'root'
})
export class EstacionamentoService {

  private baseUrl = `${environment.apiUrl}/estacionamentos`;

  constructor(private http: HttpClient) { }

  listarEstacionamentos(): Observable<Estacionamento[]> {
    return this.http.get<Estacionamento[]>(`${this.baseUrl}`);
  }

  criarEstacionamento(estacionamento: Estacionamento): Observable<Estacionamento> {
    return this.http.post<Estacionamento>(`${this.baseUrl}`, estacionamento);
  }

  atualizarEstacionamento(id: number, estacionamento: Estacionamento): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, estacionamento);
  }

  deletarEstacionamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  buscarEstacionamentoPorId(id: number): Observable<Estacionamento> {
    return this.http.get<Estacionamento>(`${this.baseUrl}/${id}`);
  }

}
