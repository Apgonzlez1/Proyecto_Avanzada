require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/pacientes', require('./routes/pacientes.routes'));
app.use('/api/odontologos', require('./routes/odontologos.routes'));
app.use('/api/citas', require('./routes/citas.routes'));

app.listen(port, () => {
  console.log(`\u2705 Servidor escuchando en http://localhost:${port}`);
});