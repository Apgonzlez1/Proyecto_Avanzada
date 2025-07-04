import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

interface Odontologo {
  id?: string;
  nombre: string;
  especialidad: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  genero: string;
}

@Component({
  selector: 'app-odontologo',
  standalone: true,
  templateUrl: './odontologos.component.html',
  styleUrls: ['./odontologos.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class OdontologoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  formulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    especialidad: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required]
  });

  odontologos: Odontologo[] = [];
  editando = false;
  idEditando: string | null = null;

  private API_URL = 'http://localhost:3000/api/odontologos';

  ngOnInit(): void {
    this.obtenerOdontologos();
  }

  obtenerOdontologos(): void {
    this.http.get<Odontologo[]>(this.API_URL).subscribe(data => {
      this.odontologos = data;
    });
  }

  guardarOdontologo(): void {
    if (this.formulario.invalid) return;

    const datos = this.formulario.value;

    if (this.editando && this.idEditando) {
      this.http.put(`${this.API_URL}/${this.idEditando}`, datos).subscribe(() => {
        this.obtenerOdontologos();
        this.cancelar();
      });
    } else {
      this.http.post(this.API_URL, datos).subscribe(() => {
        this.obtenerOdontologos();
        this.formulario.reset();
      });
    }
  }

  editar(o: Odontologo): void {
    this.formulario.patchValue(o);
    this.editando = true;
    this.idEditando = o.id ?? null;
  }

  eliminar(id: string): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      this.obtenerOdontologos();
      if (this.editando && this.idEditando === id) {
        this.cancelar();
      }
    });
  }

  cancelar(): void {
    this.formulario.reset();
    this.editando = false;
    this.idEditando = null;
  }
}
