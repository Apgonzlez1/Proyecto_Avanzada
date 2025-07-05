import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

interface Paciente {
  id?: string;
  nombres: string;
  fechanacimiento: string;
  direccion: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-paciente',
  standalone: true,
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PacienteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  formulario: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    fechanacimiento: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]]
  });

  pacientes: Paciente[] = [];
  editando = false;
  idEditando: string | null = null;

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes(): void {
    this.api.getPacientes().subscribe({
      next: data => this.pacientes = data,
      error: err => console.error('Error al obtener pacientes:', err)
    });
  }

  guardarPaciente(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido:', this.formulario.value);
      return;
    }

    const datos = this.formulario.value;

    if (this.editando && this.idEditando) {
      this.api.updatePaciente(this.idEditando, datos).subscribe({
        next: () => {
          console.log('Paciente actualizado');
          this.obtenerPacientes();
          this.cancelar();
        },
        error: err => console.error('Error al actualizar paciente:', err)
      });
    } else {
      this.api.addPaciente(datos).subscribe({
        next: () => {
          console.log('Paciente creado');
          this.obtenerPacientes();
          this.formulario.reset();
        },
        error: err => console.error('Error al crear paciente:', err)
      });
    }
  }

  editar(p: Paciente): void {
    this.formulario.patchValue(p);
    this.editando = true;
    this.idEditando = p.id ?? null;
  }

  eliminar(id: string): void {
    this.api.deletePaciente(id).subscribe({
      next: () => this.obtenerPacientes(),
      error: err => console.error('Error al eliminar paciente:', err)
    });
  }

  cancelar(): void {
    this.formulario.reset();
    this.editando = false;
    this.idEditando = null;
  }
}
