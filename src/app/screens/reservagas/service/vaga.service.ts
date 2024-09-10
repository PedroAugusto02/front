import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../../../model/Vaga';
import { environment } from '../../../../environments/environment';
import { ClienteAvulso } from '../../../model/ClienteAvulso';
import { Reserva } from '../../../model/Reserva';


@Injectable({
  providedIn: 'root'
})
export class VagaService {

  private baseUrl = `${environment.apiUrl}/vagas`;

  constructor(private http: HttpClient) { }

  criarVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.baseUrl, vaga);
  }

  listarVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.baseUrl);
  }

  atualizarVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.put<Vaga>(`${this.baseUrl}/${vaga.id}`, vaga);
  }

  deletarVaga(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  listarVagasPorEstacionamento(estacionamentoId: number): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.baseUrl}/estacionamento/${estacionamentoId}`);
  }

  criarReserva(vagaId: number, cliente: ClienteAvulso): Observable<any> {
    return this.http.post(`${this.baseUrl}/${vagaId}/reservar`, cliente);
  }

  listarReservaPorVaga(vagaId: number): Observable<Reserva> {
    return this.http.get<Reserva>(`/api/vagas/${vagaId}/reservas`);
  }

}
