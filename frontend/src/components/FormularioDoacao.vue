<script setup>
import { ref, watch, nextTick } from 'vue'
import { registrarDoacao } from '../services/api'

defineProps({
  campanhas: { type: Array, required: true },
  carregando: Boolean,
})

const campanhaId = defineModel('campanhaId', { default: '' })
const enviando = defineModel('enviando', { default: false })
const doador = ref('')
const quantidade = ref(1)
const erroDoacao = ref('')
const sucesso = ref('')
const campoDoador = ref(null)

watch(campanhaId, async (id) => {
  if (!id) return
  erroDoacao.value = ''
  sucesso.value = ''
  await nextTick()
  campoDoador.value?.focus()
})

async function enviarDoacao() {
  erroDoacao.value = ''
  sucesso.value = ''
  if (
    !campanhaId.value ||
    !doador.value.trim() ||
    !Number.isInteger(quantidade.value) ||
    quantidade.value <= 0
  ) {
    erroDoacao.value =
      'Selecione uma campanha, informe seu nome e uma quantidade inteira maior que zero.'
    return
  }
  enviando.value = true
  try {
    const dados = await registrarDoacao({
      campanhaId: Number(campanhaId.value),
      doador: doador.value.trim(),
      quantidade: quantidade.value,
    })
    sucesso.value = `Obrigado, ${dados.doador}! Sua doação de ${dados.quantidade} item(ns) foi registrada.`
    doador.value = ''
    quantidade.value = 1
    campanhaId.value = ''
  } catch (erro) {
    erroDoacao.value = erro.message
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <section class="formulario" aria-labelledby="titulo-doacao">
    <h2 id="titulo-doacao">Registre sua doação</h2>
    <p>Escolha a campanha e informe quantos itens você deseja doar.</p>
    <p v-if="carregando" role="status">Aguarde o carregamento das campanhas.</p>
    <p v-else-if="!campanhas.length">
      O formulário ficará disponível quando houver campanhas carregadas.
    </p>
    <p v-if="enviando" role="status">Enviando sua doação...</p>
    <form :aria-busy="enviando" @submit.prevent="enviarDoacao">
      <fieldset :disabled="enviando || carregando || !campanhas.length">
        <label for="campanha">Campanha</label>
        <select id="campanha" v-model="campanhaId" required>
          <option disabled value="">Selecione uma campanha</option>
          <option v-for="campanha in campanhas" :key="campanha.id" :value="campanha.id">
            {{ campanha.titulo }}
          </option>
        </select>
        <label for="doador">Seu nome</label>
        <input
          id="doador"
          ref="campoDoador"
          v-model="doador"
          type="text"
          autocomplete="name"
          placeholder="Digite seu nome"
          required
        />
        <label for="quantidade">Quantidade de itens</label>
        <input
          id="quantidade"
          v-model.number="quantidade"
          type="number"
          min="1"
          step="1"
          required
        />
        <button type="submit">{{ enviando ? 'Registrando...' : 'Registrar doação' }}</button>
      </fieldset>
    </form>
    <p v-if="erroDoacao" class="mensagem erro" role="alert">{{ erroDoacao }}</p>
    <p v-if="sucesso" class="mensagem sucesso" role="status">{{ sucesso }}</p>
  </section>
</template>
