import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'

export const routerHistory = createWebHistory()

export default createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
