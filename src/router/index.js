import Vue from 'vue'
import VueRouter from 'vue-router'

import api from '../api'
// import { handleOauthCallback } from '../api/oauth'
import Company from '../views/Company'
import CompanyEdit from '../views/CompanyEdit'
import CompanyList from '../views/CompanyList'
import PostList from '../views/PostList'
import Post from '../views/Post'
import PostEdit from '../views/PostEdit'
import PersonList from '../views/PersonList'
import Person from '../views/Person'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'CompanyList' }
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: CompanyList,
    props: (route) => ({ ...route.query, ...route.params })
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostList,
    props: (route) => ({ ...route.query, ...route.params })
  },
  {
    path: '/companies/new',
    name: 'CompanyNew',
    component: CompanyEdit,
    props: false,
    meta: { requiresAuth: true }
  },
  {
    path: '/companies/:slug/edit',
    name: 'CompanyEdit',
    component: CompanyEdit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/companies/:slug',
    name: 'Company',
    component: Company,
    props: true,
  },
  {
    path: '/posts/new',
    name: 'PostNew',
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
    path: '/auth/:provider',
    name: 'Auth',
    redirect: (to) => {
      const { code, error, state } = to.query
      const { provider, route } = JSON.parse(state)
      return {
        path: route.path,
        query: { ...route.query, code, error, provider, login: 1 },
      }
    },
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
      return next({
        path: from.path,
        query: { login: 1 }
      })
    } else {
      return next()
    }
  } else {
    return next()
  }
})


export default router
