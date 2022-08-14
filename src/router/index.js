import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import MyprofileView from '../views/MyprofileView.vue'
import MypostsView from '../views/MypostsView.vue'
import NewpostView from '../views/NewpostView.vue'
import ShowpostView from '../views/ShowpostView.vue'
import EditpostView from '../views/EditpostView.vue'
import ErrorView from '../views/ErrorView.vue'
import { auth } from "../firebase/index";

const routes = [
  {
    path: '/Error',
    name: 'Error',
    component: ErrorView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/Myprofile',
    name: 'Myprofile',
    component: MyprofileView
  },
  {
    path: '/Myposts',
    name: 'Myposts',
    component: MypostsView
  },
  {
    path: '/Newpost',
    name: 'Newpost',
    component: NewpostView
  },
  {
    path: '/Showpost',
    name: 'Showpost',
    component: ShowpostView
  },
  {
    path: '/Editpost',
    name: 'Editpost',
    component: EditpostView
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  
  if (to.path === '/Login' && auth.currentUser != null) {
      next('/')
      return;
  }
  if (to.path === '/Newpost' && auth.currentUser == null) {
      next('/')
      return;
  }
  if (to.path === '/Myprofile' && auth.currentUser == null) {
      next('/')
      return;
  }
  if (to.path === '/Myposts' && auth.currentUser == null) {
      next('/')
      return;
  }

  const route = JSON.stringify(routes)
  if(!(route.includes(to.path,1)) && to.path != '/Error'){
    next('/Error')
    return; 
  }
  


  // if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
  //     next('/Login')
  //     return;
  // }
  next();
})

export default router
