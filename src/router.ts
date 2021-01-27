import { createRouter, createWebHistory } from 'vue-router'
import Karuta from '@/pages/Karuta/Karuta.vue'
import Gallery from '@/pages/Gallery/Gallery.vue'

export const routerHistory = createWebHistory()

export default createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Karuta
    },
    {
      path: '/karuta',
      name: 'karuta',
      component: Karuta
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    }
  ]
})
