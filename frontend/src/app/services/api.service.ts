import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${BASE_URL}/pacientes`, data);
  }

  updatePaciente(id: string, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/pacientes/${id}`, data);
  }

  deletePaciente(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/pacientes/${id}`);
  }

  // === ODONTÓLOGOS ===
  getOdontologos(): Observable<any> {
    return this.http.get(`${BASE_URL}/odontologos`);
  }

  addOdontologo(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/odontologos`, data);
  }

  updateOdontologo(id: string, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/odontologos/${id}`, data);
  }

  deleteOdontologo(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/odontologos/${id}`);
  }

  // === CITAS ===
  getCitas(): Observable<any> {
    return this.http.get(`${BASE_URL}/citas`);
  }

  addCita(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/citas`, data);
  }

  updateCita(id: string, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/citas/${id}`, data);
  }

  deleteCita(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/citas/${id}`);
  }
}
