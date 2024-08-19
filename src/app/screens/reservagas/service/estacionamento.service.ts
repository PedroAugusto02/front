import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Estacionamento } from '../../../entity/Estacionamento';
import { Vendedor } from '../../../entity/Vendedor';


@Injectable({
  providedIn: 'root'
})
export class EstacionamentoService {

  private baseUrl = `${environment.apiUrl}/estacionamentos`;

  constructor(private http: HttpClient) { }

  listarEstacionamentos(): Observable<Estacionamento[]> {
    return this.http.get<Estacionamento[]>(`${this.baseUrl}`);
  }

  listarEstacionamentosPorUsuario(usuarioId: number): Observable<Estacionamento[]> {
    const headers = new HttpHeaders().set('usuario-id', usuarioId.toString());
    return this.http.get<Estacionamento[]>(`${this.baseUrl}/usuario`, { headers });
  }

  criarEstacionamento(estacionamento: Estacionamento): Observable<Estacionamento> {
    return this.http.post<Estacionamento>(`${this.baseUrl}`, estacionamento);
  }

  criarEstacionamentoPorUsuario(estacionamento: Estacionamento, usuarioId: number): Observable<Estacionamento> {
    return this.http.post<Estacionamento>(`${this.baseUrl}/criar-por-usuario`, estacionamento, {
      headers: new HttpHeaders({
        'usuario-id': usuarioId.toString()
      })
    });
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
