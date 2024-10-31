import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ViaCep } from '../../../model/ViaCep';
import { Estado } from '../../../model/Estado';
import { Cidade } from '../../../model/Cidade';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  private apiUrl = `${environment.apiUrl}/util`;

  constructor(private http: HttpClient) { }

  // Requisição para obter CEP
  obterCep(cep: string): Observable<ViaCep> {
    return this.http.get<ViaCep>(`${this.apiUrl}/obterCep?cep=${cep}`);
  }

  // Requisição para obter todos os estados
  obterEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`);
  }

  // Requisição para obter todos os estados
  obterCidades(): Observable<Cidade[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/cidades`);
  }

  // Requisição para obter cidades por estado
  obterCidadesPorEstado(estadoId: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.apiUrl}/estados/${estadoId}/cidades`);
  }

}
