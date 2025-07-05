import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // === PACIENTES ===
  getPacientes(): Observable<any> {
    return this.http.get(`${BASE_URL}/pacientes`);
  }

  addPaciente(data: any): Observable<any> {
    console.log('📤 Enviando datos del paciente al backend:', data); // Depuración

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${BASE_URL}/pacientes`, data, { headers });
  }

  updatePaciente(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${BASE_URL}/pacientes/${id}`, data, { headers });
  }

  deletePaciente(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/pacientes/${id}`);
  }

  // === ODONTÓLOGOS ===
  getOdontologos(): Observable<any> {
    return this.http.get(`${BASE_URL}/odontologos`);
  }

  addOdontologo(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${BASE_URL}/odontologos`, data, { headers });
  }

  updateOdontologo(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${BASE_URL}/odontologos/${id}`, data, { headers });
  }

  deleteOdontologo(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/odontologos/${id}`);
  }
}
