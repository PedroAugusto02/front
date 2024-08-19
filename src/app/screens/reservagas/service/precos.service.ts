import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TabelaDePrecos } from '../../../entity/TabelaDePrecos';
import { Preco } from '../../../entity/Preco';

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
  
}
