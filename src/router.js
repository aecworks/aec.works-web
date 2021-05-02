import Vue from 'vue'
import VueRouter from 'vue-router'

import api from '@/api'
import Company from '@/views/Company'
import CompanyEdit from '@/views/CompanyEdit'
import CompanyList from '@/views/CompanyList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'CompanyList' },
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: CompanyList,
    props: (route) => ({ ...route.query, ...route.params }),
  },
  {
    path: '/posts',
    name: 'PostList',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/PostList'),
    props: (route) => ({ ...route.query, ...route.params }),
  },
  {
    path: '/companies/new',
    name: 'CompanyNew',
    component: () => import(/* webpackChunkName: "company-edit" */ '@/views/CompanyEdit'),
    props: false,
    meta: { requiresAuth: false },
  },
  {
    path: '/companies/:slug/edit',
    name: 'CompanyEdit',
    component: CompanyEdit,
    props: true,
    meta: { requiresAuth: false },
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
    component: () => import(/* webpackChunkName: "posts-edit" */ '@/views/PostEdit'),
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:slug/edit',
    name: 'PostEdit',
    component: () => import(/* webpackChunkName: "posts-edit" */ '@/views/PostEdit'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:slug',
    name: 'Post',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Post'),
    props: true,
  },
  {
    path: '/people',
    name: 'PersonList',
    component: () => import(/* webpackChunkName: "people" */ '@/views/PersonList'),
  },
  {
    path: '/people/:slug',
    name: 'Person',
    component: () => import(/* webpackChunkName: "people" */ '@/views/Person'),
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About'),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/Terms'),
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
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!api.isAuthenticated()) {
      return next({
        path: from.path,
        query: { login: 1 },
      })
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
