import { Router } from 'express';
import { campanhas } from '../data/campanhas.js';

const router = Router();

router.get('/', (request, response) => {
  return response.status(200).json(campanhas);
});

router.get('/:id', (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      error: 'ID inválido',
    });
  }

  const campanha = campanhas.find((campanha) => campanha.id === id);

  if (!campanha) {
    return response.status(404).json({
      error: 'Campanha não encontrada',
    });
  }

  return response.status(200).json(campanha);
});

export default router;
