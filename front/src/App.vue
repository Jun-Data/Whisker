<template>
  <header class="header">
    <div class="left-section">
      <span v-if="store.isLogin" class="welcome-text">환영합니다 {{ store.user }}님!</span>
      <span v-if="store.isLogin" class="logout-link" @click="logOut">로그아웃</span>
    </div>
    <nav class="navbar">
      <RouterLink 
        :to="{ name: 'MainView' }" 
        class="nav-link"
        :class="{ active: selectedNav === 'MainView' }"
        @click="handleNavClick('MainView')">Home</RouterLink>
        
      <RouterLink 
        :to="{ name: 'ArticleView' }" 
        class="nav-link"
        :class="{ active: selectedNav === 'ArticleView' }"
        @click="handleNavClick('ArticleView')">자유게시판</RouterLink>
        
      <RouterLink 
        :to="{ name: 'SignUpView' }" 
        v-if="!store.isLogin"
        class="nav-link"
        :class="{ active: selectedNav === 'SignUpView' }"
        @click="handleNavClick('SignUpView')">회원가입</RouterLink>

      <RouterLink 
        :to="{ name: 'LogInView' }" 
        v-if="!store.isLogin"
        class="nav-link"
        :class="{ active: selectedNav === 'LogInView' }"
        @click="handleNavClick('LogInView')">로그인</RouterLink>

      <RouterLink 
        :to="{ name: 'RecView' }" 
        class="nav-link"
        :class="{ active: selectedNav === 'RecView' }"
        @click="handleNavClick('RecView')">금융상품추천</RouterLink>

      <RouterLink 
        :to="{ name: 'MapView' }" 
        class="nav-link"
        :class="{ active: selectedNav === 'MapView' }"
        @click="handleNavClick('MapView')">은행찾기</RouterLink>

      <RouterLink 
        :to="{ name: 'ProductsView' }" 
        class="nav-link"
        :class="{ active: selectedNav === 'ProductsView' }"
        @click="handleNavClick('ProductsView')">상품보기</RouterLink>

      <RouterLink 
        :to="{ name: 'ExchangeView' }" 
        class="nav-link"
        :class="{ active: selectedNav === 'ExchangeView' }"
        @click="handleNavClick('ExchangeView')">환전하기</RouterLink>

      <RouterLink 
        :to="{ name: 'ProfileView' }" 
        class="nav-link"
        :class="{ active: selectedNav === 'ProfileView' }"
        @click="handleNavClick('ProfileView')">내 프로필</RouterLink>
    </nav>
  </header>
  <main class="main-content">
    <RouterView />
  </main>
</template>




<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';

const store = useCounterStore();

// 현재 경로 추적
const currentRoute = useRoute();

// 선택된 메뉴를 추적하는 상태 변수
const selectedNav = ref(null);

// 로그아웃 처리
const logOut = () => {
  store.logOut();
};

// 메뉴 클릭 시 선택된 메뉴 상태 업데이트
const handleNavClick = (navName) => {
  selectedNav.value = navName;
};
</script>


<style scoped>
/* 기본 스타일 */
body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #e3f2fd; /* 부드러운 하늘색 */
  color: #333;
}

.header {
  background: linear-gradient(135deg, #2196f3, #64b5f6); /* 파란색 그라데이션 */
  color: white;
  padding: 30px 50px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between; /* 왼쪽과 중앙 섹션을 양쪽 정렬 */
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 15px; /* 환영 메시지와 로그아웃 텍스트 사이 간격 */
}

.navbar {
  display: flex;
  flex-wrap: wrap; /* 링크가 길어질 경우 줄바꿈 */
  justify-content: center;
  gap: 15px; /* 링크 간격 */
}

.nav-link,
.logout-link {
  text-decoration: none; /* 기본 밑줄 제거 */
  color: white; /* 기본 텍스트 색상 */
  font-size: 16px; /* 글씨 크기 */
  font-weight: bold;
  cursor: pointer; /* 클릭 가능한 요소로 표시 */
  transition: color 0.3s ease; /* 부드러운 전환 효과 */
  position: relative; /* 하이라이트 효과 추가용 */
}

.nav-link:hover {
  color: #ffeb3b; /* 호버 시 텍스트 색상 변경 (밝은 노란색) */
}

.nav-link::after {
  content: ''; /* 가상 요소 */
  position: absolute;
  left: 0;
  bottom: -3px; /* 텍스트 바로 아래 */
  width: 0; /* 초기 너비는 0 */
  height: 2px; /* 하이라이트 두께 */
  background-color: #ffeb3b; /* 하이라이트 색상 */
  transition: width 0.3s ease; /* 부드러운 전환 효과 */
}

.nav-link:hover::after {
  width: 100%; /* 호버 시 전체 길이로 확장 */
}

/* 선택된 링크 스타일 */
.nav-link.active {
  color:  #ffeb3b; /* 검은색 텍스트 */
  font-weight: bold; /* 강조된 텍스트 */
}

.logout-link:hover {
  color: #000; /* 로그아웃 호버 시 검은색 */
}

.logout-link::after {
  background-color: #000; /* 로그아웃 하이라이트 색상 검은색으로 변경 */
}

.welcome-text {
  font-size: 16px;
  font-weight: bold;
}

.main-content {
  padding: 20px;
}
</style>


