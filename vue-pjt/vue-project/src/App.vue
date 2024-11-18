<template>
  <header>
    <nav>
      <!-- 환영합니다 {{ store.user }}님! -->
      <!-- <span v-if="store.isLogin">환영합니다 {{ store.user }}님!</span> -->
      <RouterLink :to="{ name: 'ArticleView' }"><button v-if="currentRoute.name !== 'ArticleView'">자유게시판</button></RouterLink>
      <RouterLink :to="{ name: 'MainView' }"><button v-if="currentRoute.name !== 'MainView'">Home</button></RouterLink>
      <RouterLink  :to="{ name: 'SignUpView' }"><button v-if="!store.isLogin">회원가입</button></RouterLink>
      <RouterLink :to="{ name: 'LogInView' }"><button v-if="!store.isLogin">로그인</button></RouterLink>
      <RouterLink :to="{ name: 'RecView' }"><button v-if="currentRoute.name !== 'RecView'">금융상품추천</button></RouterLink>
      <RouterLink :to="{ name: 'MapView' }"><button v-if="currentRoute.name !== 'MapView'">은행찾기</button></RouterLink>
      <RouterLink :to="{ name: 'ProductsView' }"><button v-if="currentRoute.name !== 'ProductsView'">상품보기</button></RouterLink>
      <RouterLink :to="{ name: 'ExchangeView' }"><button v-if="currentRoute.name !== 'ExchangeView'">환전하기</button></RouterLink>
    </nav>
    <br>
      <form @submit.prevent="logOut" v-if="store.isLogin">
        <input type="submit" value="로그아웃">
      </form>
    
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView, RouterLink, useRoute} from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { onMounted } from 'vue'

const store = useCounterStore()

const logOut = function () {
  store.logOut()
}

// const username = ref(null)
// onMounted(() => {
//   // mount 되기전에 store에 있는 전체 게시글 요청 함수를 호출
//   username.value = store.user
// })

const currentRoute = useRoute()


</script>

<style scoped>
</style>
