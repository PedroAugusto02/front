import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ViaCep } from '../../../model/ViaCep';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  private apiUrl = `${environment.apiUrl}/util`;

  constructor(private http: HttpClient) { }

  // Faz a requisição para a API de CEP passando o CEP informado
  obterCep(cep: string): Observable<ViaCep> {
    return this.http.get<ViaCep>(`${this.apiUrl}/obterCep`);
  } 

}
