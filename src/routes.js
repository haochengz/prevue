
import AC from './components/async_load'

export default [
  {
    name: "index",
    icon: 'home',
    path: '/',
    component: AC(() => import('./views/home'))
  },
  {
    name: 'detail',
    icon: 'home',
    path: '/detail/:id',
    component: AC(() => import('./views/detail'))
  }
]
