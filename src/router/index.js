import Vue from 'vue'
import VueRouter from 'vue-router'

import CompanyList from '../views/CompanyList'
import Company from '../views/Company'
import PostList from '../views/PostList'
import Post from '../views/Post'
import PersonList from '../views/PersonList'
import Person from '../views/Person'
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'PostList' }
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  // },
  {
    path: '/companies',
    name: 'Companies',
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
    path: '/companies/:id',
    name: 'Company',
    component: Company,
    props: true,
  },
  {
    path: '/posts/:id',
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
    path: '/people/:id',
    name: 'Person',
    component: Person,
    props: true,
  },
  {
    path: '/auth/github/callback',
    name: 'githubCallback',
  },

]

const router = new VueRouter({
  mode: "history",
  routes
})



export default router
