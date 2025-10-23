const express = require('express');
const app = express();
const cuentasRoutes = require('./routes/cuentasRoutes');

app.use(express.json());

// Rutas
app.use('/', cuentasRoutes);

const PORT = 3130;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
