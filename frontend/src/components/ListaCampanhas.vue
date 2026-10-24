<script setup>
defineProps({
  campanhas: { type: Array, required: true },
  carregando: Boolean,
  erroCampanhas: String,
  enviando: Boolean,
})

defineEmits(['tentar-novamente', 'selecionar'])
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
        <button type="button" :disabled="enviando" @click="$emit('selecionar', campanha.id)">
          Quero doar
        </button>
      </article>
    </div>
  </section>
</template>
