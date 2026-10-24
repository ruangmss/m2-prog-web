import { Router } from 'express';
import { campanhas } from '../data/campanhas.js';
import { doacoes } from '../data/doacoes.js';

const router = Router();

router.post('/', (request, response) => {
  const { campanhaId, doador, quantidade } = request.body ? request.body : {};

  if (
    !Number.isInteger(campanhaId) ||
    !Number.isInteger(quantidade) ||
    quantidade <= 0 ||
    typeof doador !== 'string' ||
    !doador.trim()
  ) {
    return response.status(400).json({
      error: 'Dados inválidos',
    });
  }

  const campanha = campanhas.find((campanha) => campanha.id === campanhaId);

  if (!campanha) {
    return response.status(404).json({
      error: 'Campanha não encontrada',
    });
  }

  const novaDoacao = {
    id: doacoes.length ? Math.max(...doacoes.map((doacao) => doacao.id)) + 1 : 1,
    campanhaId: campanhaId,
    doador: doador.trim(),
    quantidade: quantidade,
  };

  doacoes.push(novaDoacao);

  return response.status(201).json(novaDoacao);
});

export default router;
