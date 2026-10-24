<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import FormularioDoacao from '../components/FormularioDoacao.vue'
import { listarCampanhas } from '../services/api'

const route = useRoute()
const campanhas = ref([])
const campanhaId = ref('')
const carregando = ref(true)
const erro = ref('')

async function carregarCampanhas() {
  carregando.value = true
  erro.value = ''
  try {
    campanhas.value = await listarCampanhas()
    const id = Number(route.query.campanhaId)
    if (campanhas.value.some((campanha) => campanha.id === id)) {
      campanhaId.value = id
    } else if (route.query.campanhaId) {
      erro.value = 'A campanha informada não foi encontrada. Selecione uma campanha no formulário.'
    }
  } catch (falha) {
    erro.value = falha.message
  } finally {
    carregando.value = false
  }
}

onMounted(carregarCampanhas)
</script>

<template>
  <RouterLink to="/campanhas">Voltar para campanhas</RouterLink>
  <div v-if="erro" class="mensagem erro" role="alert">
    <p>{{ erro }}</p>
    <button v-if="!campanhas.length" type="button" @click="carregarCampanhas">
      Tentar novamente
    </button>
  </div>
  <FormularioDoacao
    v-model:campanha-id="campanhaId"
    :campanhas="campanhas"
    :carregando="carregando"
  />
</template>
