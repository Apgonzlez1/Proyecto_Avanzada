require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// === PACIENTES ===
app.get('/api/pacientes', async (req, res) => {
  const { data, error } = await supabase.from('pacientes').select('*');
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/pacientes', async (req, res) => {
  const { data, error } = await supabase.from('pacientes').insert([req.body]).select();
  if (error) return res.status(500).json(error);
  res.status(201).json(data[0]);
});

app.put('/api/pacientes/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('pacientes').update(req.body).eq('id', id);
  if (error) return res.status(500).json(error);
  res.json({ mensaje: 'Paciente actualizado' });
});

app.delete('/api/pacientes/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('pacientes').delete().eq('id', id);
  if (error) return res.status(500).json(error);
  res.json({ mensaje: 'Paciente eliminado' });
});

// === ODONTÓLOGOS ===
app.get('/api/odontologos', async (req, res) => {
  const { data, error } = await supabase.from('odontologos').select('*');
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/odontologos', async (req, res) => {
  const { data, error } = await supabase.from('odontologos').insert([req.body]).select();
  if (error) return res.status(500).json(error);
  res.status(201).json(data[0]);
});

app.put('/api/odontologos/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('odontologos').update(req.body).eq('id', id);
  if (error) return res.status(500).json(error);
  res.json({ mensaje: 'Odontólogo actualizado' });
});

app.delete('/api/odontologos/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('odontologos').delete().eq('id', id);
  if (error) return res.status(500).json(error);
  res.json({ mensaje: 'Odontólogo eliminado' });
});

// === CITAS ===
app.get('/api/citas', async (req, res) => {
  const { data, error } = await supabase.from('citas').select('*');
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/citas', async (req, res) => {
  const { id_paciente, id_odontologo, fecha } = req.body;
  if (!id_paciente || !id_odontologo || !fecha) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  const { data, error } = await supabase.from('citas').insert([{ id_paciente, id_odontologo, fecha }]).select();
  if (error) return res.status(500).json(error);
  res.status(201).json(data[0]);
});

app.put('/api/citas/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('citas').update(req.body).eq('id', id);
  if (error) return res.status(500).json(error);
  res.json({ mensaje: 'Cita actualizada' });
});

app.delete('/api/citas/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('citas').delete().eq('id', id);
  if (error) return res.status(500).json(error);
  res.json({ mensaje: 'Cita eliminada' });
});

app.listen(port, () => {
  console.log(`✅ Backend corriendo en http://localhost:${port}`);
});
