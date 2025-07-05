import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class AgendarCitaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  formulario: FormGroup = this.fb.group({
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    paciente: ['', Validators.required],
    odontologo: ['', Validators.required]
  });

  citas: any[] = [];
  editando = false;

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(): void {
    this.http.get<any[]>('http://localhost:3000/api/citas').subscribe({
      next: data => this.citas = data,
      error: err => console.error('Error al obtener citas:', err)
    });
  }

  guardarCita(): void {
    if (this.formulario.invalid) return;

    const datos = this.formulario.value;
    const fechaCompleta = `${datos.fecha}T${datos.hora}:00Z`;

    const nuevaCita = {
      id_paciente: Number(datos.paciente),
      id_odontologo: Number(datos.odontologo),
      fecha: fechaCompleta
    };

    this.http.post('http://localhost:3000/api/citas', nuevaCita).subscribe({
      next: () => {
        this.obtenerCitas();
        this.formulario.reset();
      },
      error: err => console.error('Error al guardar cita:', err)
    });
  }

  cancelar(): void {
    this.formulario.reset();
    this.editando = false;
  }
}
