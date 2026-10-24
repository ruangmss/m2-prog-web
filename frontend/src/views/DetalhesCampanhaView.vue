<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { buscarCampanha } from '../services/api'

const route = useRoute()
const campanha = ref(null)
const carregando = ref(true)
const erro = ref('')

async function carregarCampanha() {
  carregando.value = true
  erro.value = ''
  try {
    campanha.value = await buscarCampanha(route.params.id)
  } catch (falha) {
    erro.value = falha.message
  } finally {
    carregando.value = false
  }
}

onMounted(carregarCampanha)
</script>

<template>
  <section aria-labelledby="titulo-detalhes" :aria-busy="carregando">
    <RouterLink to="/campanhas">Voltar para campanhas</RouterLink>
    <h2 id="titulo-detalhes">Detalhes da campanha</h2>
    <p v-if="carregando" role="status">Carregando campanha...</p>
    <div v-else-if="erro" class="mensagem erro" role="alert">
      <p>{{ erro }}</p>
      <button type="button" @click="carregarCampanha">Tentar novamente</button>
    </div>
    <article v-else-if="campanha" class="cartao">
      <h3>{{ campanha.titulo }}</h3>
      <p>{{ campanha.descricao }}</p>
      <p class="meta">Meta: {{ campanha.meta }} itens</p>
      <RouterLink class="botao" :to="{ path: '/doacoes/nova', query: { campanhaId: campanha.id } }"
        >Quero doar</RouterLink
      >
    </article>
  </section>
</template>
