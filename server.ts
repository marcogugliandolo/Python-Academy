import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir los archivos estáticos generados por Vite (React)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Redirigir cualquier otra petición al index.html (para que funcione React Router si lo usas)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor de Python Academy corriendo en http://0.0.0.0:${PORT}`);
});
