import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Vendedor } from '../../../model/Vendedor';


@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  private baseUrl = `${environment.apiUrl}/vendedores`;

  constructor(private http: HttpClient) { }

  criarVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(this.baseUrl, vendedor);
  }

  listarVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.baseUrl);
  }

  atualizarVendedor(id: number, vendedor: Vendedor): Observable<Vendedor> {
    return this.http.put<Vendedor>(`${this.baseUrl}/${id}`, vendedor);
  }

  deletarVendedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
