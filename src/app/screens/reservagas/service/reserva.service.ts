import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Reserva } from '../../../entity/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private baseUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) { }

  atualizarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.baseUrl}/${reserva.id}`, reserva);
  }
  
}
