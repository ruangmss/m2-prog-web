<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  campanhas: { type: Array, required: true },
  carregando: Boolean,
  erroCampanhas: String,
})

defineEmits(['tentar-novamente'])
</script>

<template>
  <section aria-labelledby="titulo-campanhas" :aria-busy="carregando">
    <h2 id="titulo-campanhas">Escolha uma campanha</h2>
    <p v-if="carregando" role="status">Carregando campanhas...</p>
    <div v-else-if="erroCampanhas" role="alert" class="mensagem erro">
      <p>{{ erroCampanhas }}</p>
      <button type="button" @click="$emit('tentar-novamente')">Tentar novamente</button>
    </div>
    <p v-else-if="!campanhas.length">Nenhuma campanha disponível no momento.</p>
    <div v-else class="campanhas">
      <article v-for="campanha in campanhas" :key="campanha.id" class="cartao">
        <h3>{{ campanha.titulo }}</h3>
        <p>{{ campanha.descricao }}</p>
        <p class="meta">Meta: {{ campanha.meta }} itens</p>
        <RouterLink class="botao" :to="`/campanhas/${campanha.id}`">Ver detalhes</RouterLink>
      </article>
    </div>
  </section>
</template>
