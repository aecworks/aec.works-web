import Vue from 'vue'
import VueRouter from 'vue-router'

import api from '../api'
import CompanyList from '../views/CompanyList'
import Company from '../views/Company'
import PostList from '../views/PostList'
import Post from '../views/Post'
import PostEdit from '../views/PostEdit'
import PersonList from '../views/PersonList'
import Person from '../views/Person'
import Profile from '../views/Profile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'PostList' }
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: CompanyList,
    props: true,
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostList,
    props: true,
  },
  {
    path: '/companies/:slug',
    name: 'Company',
    component: Company,
    props: true,
  },
  {
    path: '/posts/compose',
    name: 'PostCompose',
    component: PostEdit,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/:slug/edit',
    name: 'PostEdit',
    component: PostEdit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/:slug',
    name: 'Post',
    component: Post,
    props: true,
  },
  {
    path: '/people',
    name: 'PersonList',
    component: PersonList,
  },
  {
    path: '/people/:slug',
    name: 'Person',
    component: Person,
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: true,
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!api.isAuthenticated()) {
      next({
        path: from.path,
        query: { login: 1 }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
