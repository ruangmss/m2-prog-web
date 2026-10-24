<script setup>
import { onMounted, ref } from 'vue'
import ListaCampanhas from '../components/ListaCampanhas.vue'
import FormularioDoacao from '../components/FormularioDoacao.vue'
import { listarCampanhas } from '../services/api'

const campanhas = ref([])
const carregando = ref(true)
const erroCampanhas = ref('')
const campanhaId = ref('')
const enviando = ref(false)

async function carregarCampanhas() {
  carregando.value = true
  erroCampanhas.value = ''
  try {
    campanhas.value = await listarCampanhas()
  } catch (erro) {
    erroCampanhas.value = erro.message
  } finally {
    carregando.value = false
  }
}

onMounted(carregarCampanhas)
</script>

<template>
  <ListaCampanhas
    :campanhas="campanhas"
    :carregando="carregando"
    :erro-campanhas="erroCampanhas"
    :enviando="enviando"
    @tentar-novamente="carregarCampanhas"
    @selecionar="campanhaId = $event"
  />
  <FormularioDoacao
    v-model:campanha-id="campanhaId"
    v-model:enviando="enviando"
    :campanhas="campanhas"
    :carregando="carregando"
  />
</template>
