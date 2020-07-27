import Vue from 'vue'
import VueRouter from 'vue-router'

import CompanyList from '../views/CompanyList'
import Company from '../views/Company'
import PostList from '../views/PostList'
import Post from '../views/Post'
import PostCompose from '../views/PostCompose'
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
    path: '/companies/:slug',
    name: 'Company',
    component: Company,
    props: true,
  },
  {
    path: '/posts/compose',
    name: 'Post Compose',
    component: PostCompose,
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



export default router
