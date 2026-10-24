<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <h1>Campanhas solidárias</h1>
      <p>Pequenas doações fazem a diferença na vida de uma criança.</p>
      <nav aria-label="Navegação principal">
        <RouterLink to="/campanhas">Campanhas</RouterLink>
        <RouterLink to="/doacoes/nova">Registrar doação</RouterLink>
      </nav>
    </div>
  </header>
  <main class="container">
    <RouterView :key="$route.fullPath" />
  </main>
  <footer>Juntos, podemos ajudar mais crianças.</footer>
</template>
