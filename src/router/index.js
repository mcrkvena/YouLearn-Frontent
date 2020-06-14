import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Videos from '../components/Video.vue'
import Forum from '../views/Forum.vue'

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
      }
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
    component: () => import(/* webpackChunkName: "mychannel" */ '../views/MyChannel.vue')
  },
  {
    path: '/videocategories',
    name: 'videocategories',
    component: () => import(/* webpackChunkName: "videocategories" */ '../views/VideoCategories.vue'),
  },
  {
    path: '/videocategories/school',
    name: 'school',
    component: () => import(/* webpackChunkName: "school" */ '../views/School.vue'),
  },
  {
    path: '/videocategories/vehicles',
    name: 'vehicles',
    component: () => import(/* webpackChunkName: "vehicles" */ '../views/Vehicles.vue'),
  },
  {
    path: '/videocategories/music',
    name: 'music',
    component: () => import(/* webpackChunkName: "music" */ '../views/Music.vue'),
  },
  {
    path: '/videocategories/games',
    name: 'games',
    component: () => import(/* webpackChunkName: "games" */ '../views/Games.vue'),
  },
  {
    path: '/videocategories/tech',
    name: 'tech',
    component: () => import(/* webpackChunkName: "tech" */ '../views/Tech.vue'),
  },
  {
    path: '/videocategories/gardening',
    name: 'gardening',
    component: () => import(/* webpackChunkName: "gardening" */ '../views/Gardening.vue'),
  },
  {
    path: '/videocategories/sports',
    name: 'sports',
    component: () => import(/* webpackChunkName: "sports" */ '../views/Sports.vue'),
  },
  {
    path: '/videocategories/cooking',
    name: 'cooking',
    component: () => import(/* webpackChunkName: "cooking" */ '../views/Cooking.vue'),
  },
  {
    path: '/videocategories/miscellaneous',
    name: 'miscellaneous',
    component: () => import(/* webpackChunkName: "miscellaneous" */ '../views/Miscellaneous.vue'),
  },
  {
    path: '/forum',
    name: 'posts',
    component: Forum,
  },
  {
    path: '/forum/:id',
    props: true,
    name: 'postdetail',
    component: () => import(/* webpackChunkName: "postdetail" */ '../views/PostDetail.vue')
  },
  {
    path: '/videos/:id',
    props: true,
    name: 'videodetail',
    component: () => import(/* webpackChunkName: "videodetail" */ '../views/VideoDetail.vue')
  },
  {
    path: '/videocategories/videos/:id',
    props: true,
    name: 'videodetail',
    component: () => import(/* webpackChunkName: "videodetail" */ '../views/VideoDetail.vue')
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
