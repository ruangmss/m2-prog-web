import { createRouter, createWebHistory } from 'vue-router'
import CampanhasView from '../views/CampanhasView.vue'
import DetalhesCampanhaView from '../views/DetalhesCampanhaView.vue'
import DoacaoView from '../views/DoacaoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/campanhas' },
    { path: '/campanhas', component: CampanhasView },
    { path: '/campanhas/:id', component: DetalhesCampanhaView },
    { path: '/doacoes/nova', component: DoacaoView },
    { path: '/:pathMatch(.*)*', redirect: '/campanhas' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
