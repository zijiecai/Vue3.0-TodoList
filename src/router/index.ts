import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import addAndDone from '../components/AddAndDone.vue'
import Delete from '../components/Delete.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: { name: 'addAndDone' }
      },
      {
        path: '/addAndDone',
        name: 'addAndDone',
        component: addAndDone
      },
      {
        path: '/delete',
        name: 'delete',
        component: Delete
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
})

export default router
