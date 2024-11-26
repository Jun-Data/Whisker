<template>
  <header class="header">
    <img :src="logo" alt="" width="145" height="100">
    <nav class="navbar">
      <div class="nav-links">
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
      </div>

      <div class="auth-section" v-if ="!store.isLogin">
        <RouterLink 
            :to="{ name: 'LogInView' }" 
            :class="{ active: selectedNav === 'LogInView' }"
            @click="handleNavClick('LogInView')">로그인</RouterLink>
        <h3>|</h3>
        <RouterLink 
            :to="{ name: 'SignUpView' }" 
            :class="{ active: selectedNav === 'SignUpView' }"
            @click="handleNavClick('SignUpView')">회원가입</RouterLink>
          </div>

      <div class="icon-section" v-if="store.isLogin">
        <RouterLink 
          :to="{ name: 'ProfileView' }" 
          :class="{ active: selectedNav === 'ProfileView' }"
          @click="handleNavClick('ProfileView')">
          <font-awesome-icon 
            icon="fa-solid fa-user"
            :style="{ color: selectedNav === 'ProfileView' || isHovered ? ' #174a80' : '#333', fontSize: '27px' }"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false" />
        </RouterLink>
        <h3>|</h3>
        <span @click="openModal">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" style="font-size: 27px;" class="log-link" />
        </span>
      </div>
    </nav>
  </header>
  <main class="main-content">
    <Modal :isOpen="isModalOpened" @modal-close="closeModal" name="first-modal" :class="modalClass">
      <template #content>
        <p class="modal-message">로그아웃 하시겠습니까?</p>
        <div class="modal-buttons">
          <button @click="logOut" class="btn-logout">로그아웃</button>
          <button @click="closeModal" class="btn-cancel">취소</button>
        </div>
      </template>
    </Modal>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';
import Modal from './components/Modal.vue';
import logo from '@/assets/whiskerlogo.png'

const store = useCounterStore();
const isModalOpened = ref(false);
const isHovered = ref(false);  // hover 상태 관리
const modalClass = ref('fade-in'); // 페이드 인 애니메이션 적용

const openModal = () => {
  isModalOpened.value = true;
  modalClass.value = 'fade-in';
};
const closeModal = () => {
  isModalOpened.value = false;
  modalClass.value = 'fade-in';  // 슬라이드 아웃 애니메이션
  setTimeout(() => {
    isModalOpened.value = false;
  }, 300); // 애니메이션 시간 이후에 모달 숨기기
};

const selectedNav = ref(null);

const logOut = () => {
  store.logOut();
  if (isModalOpened) closeModal();
};

const handleNavClick = (navName) => {
  selectedNav.value = navName;
};

</script>

<style>
/* 기본 스타일 */
body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #ffffff; /* 부드러운 배경색 */
  color: #333; /* 기본 텍스트 색상 */
}

.header {
  background-color: #ffffff; /* 웹 바디와 같은 배경색 */
  color: #333;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd; /* 약간의 구분선 */
}

.navbar {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 40px; /* 네비게이션 아이템 간 간격 */
  justify-content: center;
  flex: 1;
}

.nav-link {
  font-size: 20px;
  font-weight: bold;
  text-decoration: none; /* 밑줄 제거 */
  color: #333; /* 기본 텍스트 색상 */
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative; /* 밑줄 효과를 위한 설정 */
}

.nav-link.active {
  color: #6751b1;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px; /* 텍스트 바로 아래 */
  width: 0; /* 초기 너비는 0 */
  height: 2px; /* 하이라이트 두께 */
  background-color: #a0a9da; /* 하이라이트 색상 */
  transition: width 0.3s ease; /* 부드러운 전환 효과 */
}

.nav-link:hover::after {
  width: 100%; /* 호버 시 전체 길이로 확장 */
}

.auth-section {
  display: flex; /* 가로 배치 */
  align-items: center; /* 세로 정렬 */
  gap: 15px; /* 아이콘 간의 간격 설정 */
}

.auth-section a {
  font-size: 20px;
  font-weight: bold;
  text-decoration: none; /* 밑줄 제거 */
  color: #333; /* 기본 텍스트 색상 */
  transition: color 0.3s ease; /* 부드러운 전환 효과 */
}

.auth-section a:hover {
  color: #174a80; /* 호버 시 강조 색상 */
}

.auth-section h3 {
  margin: 0;
  font-size: 20px;
  color: #333; /* 구분선 색상 */
}

.icon-section {
  display: flex; /* 가로 배치 */
  align-items: center; /* 세로 정렬 */
  gap: 27px; /* 아이콘 간의 간격 설정 */
}

.log-link:hover {
  color: #174a80; /* 호버 시 강조 색상 */
}

.main-content {
  padding: 20px;
  background-color: #ffffff; /* 웹 바디와 동일한 배경색 */
}

/* 모달 메시지 스타일 */
.modal-message {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

/* 버튼 레이아웃 */
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.modal-buttons button {
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-logout {
  background-color: #b91c10; /* 붉은색 배경 */
  color: white;
}

.btn-cancel {
  background-color: #9e9e9e; /* 회색 배경 */
  color: white;
}

.btn-logout:hover {
  background-color: #d32f2f; /* 마우스 오버 시 어두운 붉은색 */
}

.btn-cancel:hover {
  background-color: #616161; /* 마우스 오버 시 어두운 회색 */
}

/* 페이드 인/아웃 효과 */
.fade-in {
  animation: fadeIn 0.2s ease-in;
}

.fade-out {
  animation: fadeOut 0.01s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}



</style>

