import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TabelaDePrecos } from '../../../model/TabelaDePrecos';
import { Preco } from '../../../model/Preco';

@Injectable({
  providedIn: 'root'
})
export class PrecosService {

  private apiUrl = `${environment.apiUrl}/precos`;

  constructor(private http: HttpClient) { }

  adicionarPreco(preco: Preco): Observable<Preco> {
    return this.http.post<Preco>(this.apiUrl, preco);
  }

  carregarPrecos(estacionamentoId: number): Observable<Preco[]> {
    return this.http.get<Preco[]>(`${this.apiUrl}/estacionamento/${estacionamentoId}`);
  }

  atualizarPreco(preco: Preco): Observable<Preco> {
    return this.http.put<Preco>(`${this.apiUrl}/${preco.id}`, preco);
  }

  deletarPreco(preco: Preco): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${preco.id}`);
  }
  
}
