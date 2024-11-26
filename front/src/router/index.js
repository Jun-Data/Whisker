import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ArticleView from '@/views/ArticleView.vue'
import DetailView from '@/views/DetailView.vue'
import CreateView from '@/views/CreateView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LogInView from '@/views/LogInView.vue'
import RecView from '@/views/RecView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ExchangeView from '@/views/ExchangeView.vue'
import MapView from '@/views/MapView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProfileUpdateView from '@/views/ProfileUpdateView.vue'
// import DepositDetailView from '@/views/ProductDetailView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import ArticleUpdateView from '@/views/ArticleUpdateView.vue'
import Game from '@/components/Games/Game.vue'
import Game_1 from '@/components/Games/Game_1.vue'
import Game_2 from '@/components/Games/Game_2.vue'
import Game_3 from '@/components/Games/Game_3.vue'
import Game_4 from '@/components/Games/Game_4.vue'
import Game_5 from '@/components/Games/Game_5.vue'
import Game_6 from '@/components/Games/Game_6.vue'
import Game_7 from '@/components/Games/Game_7.vue'
import EndGameView from '@/views/EndGameView.vue'

import { useCounterStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView,
    },
    {
      path: '/article',
      name: 'ArticleView',
      component: ArticleView
    },
    {
      path: '/articles/:id',
      name: 'DetailView',
      component: DetailView
    },
    {
      path: '/create',
      name: 'CreateView',
      component: CreateView
    },
    {
      path: '/signup',
      name: 'SignUpView',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'LogInView',
      component: LogInView
    },
    {
      path: '/rec',
      name: 'RecView',
      component: RecView
    },
    {
      path: '/products',
      name: 'ProductsView',
      component: ProductsView
    },
    {
      path: '/exchange',
      name: 'ExchangeView',
      component: ExchangeView
    },
    {
      path: '/map',
      name: 'MapView',
      component: MapView
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    },
    {
      path: '/profile/update',
      name: 'ProfileUpdateView',
      component: ProfileUpdateView
    },
    // {
    //   path: '/products/:type/:productId/:optionId',
    //   name: 'DepositDetailView',
    //   component: DepositDetailView
    // },
    {
      path: '/articles/:id/update',
      name: 'ArticleUpdateView',
      component: ArticleUpdateView
    },
    {
      path: '/products/:productId',
      name: 'ProductDetailView',
      component: ProductDetailView
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      children : [
        {
          path: '1',
          name: 'Game_1',
          component: Game_1
        },
        {
          path: '2',
          name: 'Game_2',
          component: Game_2
        },
        {
          path: '3',
          name: 'Game_3',
          component: Game_3
        },
        {
          path: '4',
          name: 'Game_4',
          component: Game_4
        },
        {
          path: '5',
          name: 'Game_5',
          component: Game_5
        },
        {
          path: '6',
          name: 'Game_6',
          component: Game_6
        },
        {
          path: '7',
          name: 'Game_7',
          component: Game_7
        },
      ]
    },
    {
      path: '/endgame',
      name: 'EndGameView',
      component: EndGameView
    },
  ],
})

// 전역 네비게이션 가드
router.beforeEach((to, from) => {
  const store = useCounterStore()
  // 만약 이동하는 목적지가 게시글 페이지이면서
  // 현재 로그인 상태가 아니라면 로그인 페이지로 보냄
  if (
    !store.isLogin &&
    (to.name === 'RecView' || to.path === '/create' || to.path === '/profile' ) 
  ) {
    window.alert('로그인이 필요합니다.')
    return { name: 'LogInView' }
  }
  // 만약 로그인 사용자가 회원가입 또는 로그인 페이지로 이동하려고 하면
  // 메인 페이지로 보냄
  if ((to.name === 'SignUpView' || to.name === 'LogInView') && (store.isLogin)) {
    window.alert('이미 로그인 되어있습니다.')
    return { name: 'ArticleView' }
  }
})

export default router