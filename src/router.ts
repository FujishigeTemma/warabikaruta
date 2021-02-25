import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Karuta from '@/pages/Karuta/Karuta.vue'
import Gallery from '@/pages/Gallery/Gallery.vue'
import Guide from '@/pages/Guide/Guide.vue'

export const routerHistory = createWebHistory()

export default createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
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
    },
    {
      path: '/guide',
      name: 'guide',
      component: Guide
    }
  ]
})
