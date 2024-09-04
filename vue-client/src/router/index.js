import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashLayout from '@/layouts/DashMain/DashLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashLayout,
      children: [{ path: 'home', name: 'home', component: HomeView }]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
