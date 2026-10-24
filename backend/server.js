import express from 'express';
import cors from 'cors';

import campanhasRoutes from './routes/campanhasRoutes.js';
import doacoesRoutes from './routes/doacoesRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/campanhas', campanhasRoutes);
app.use('/api/doacoes', doacoesRoutes);

app.use((request, response) => {
  return response.status(404).json({
    error: 'Rota não encontrada',
  });
});

// Inicialização
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
