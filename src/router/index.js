import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Videos from '../components/Video.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'videos',
        component: Videos
      },
 //     {
 //       path: 'post/:id',
 //       props: true,
 //       name: 'post-detail',
 //       component: () => import(/* webpackChunkName: "post-detail" */ '../views/ForumPost.vue')
 //     }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/mychannel',
    name: 'mychannel',
    component: () => import(/* webpackChunkName: "register" */ '../views/MyChannel.vue')
  },
  {
    path: '/videocategories',
    name: 'videocategories',
    component: () => import(/* webpackChunkName: "register" */ '../views/VideoCategories.vue')
  },
  {
    path: '/forum',
    name: 'posts',
    component: () => import(/* webpackChunkName: "register" */ '../views/Forum.vue')
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: () => import(/* webpackChunkName: "newpost" */ '../views/NewPost.vue')
  },
  {
    path: '/newvideo',
    name: 'newvideo',
    component: () => import(/* webpackChunkName: "newvideo" */ '../views/NewVideo.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
