import Vue from 'vue'
import VueRouter from 'vue-router'
import DisplayItemList from '../views/DisplayItemList.vue'
import AddItem from '../views/AddItem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DisplayItemList',
    component: DisplayItemList
  },
  {
    path: '/add',
    name: 'AddItem',
    component: AddItem
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
