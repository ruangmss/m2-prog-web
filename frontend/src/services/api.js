async function requisitar(caminho, opcoes) {
  let resposta
  try {
    resposta = await fetch('/api' + caminho, opcoes)
  } catch {
    throw new Error(
      'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
    )
  }

  let dados
  try {
    dados = await resposta.json()
  } catch {
    throw new Error('O servidor retornou uma resposta inválida. Tente novamente.')
  }

  if (!resposta.ok) {
    throw new Error(dados?.error || 'Não foi possível concluir a solicitação. Tente novamente.')
  }

  return dados
}

export async function listarCampanhas() {
  const dados = await requisitar('/campanhas')
  if (!Array.isArray(dados)) {
    throw new Error('O servidor retornou uma lista de campanhas inválida.')
  }
  return dados
}

export function buscarCampanha(id) {
  return requisitar('/campanhas/' + encodeURIComponent(id))
}

export function registrarDoacao(doacao) {
  return requisitar('/doacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doacao),
  })
}
