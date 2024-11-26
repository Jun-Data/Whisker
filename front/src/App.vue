<template>
  <header class="header bg-light shadow-sm py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- 로고 (왼쪽 정렬) -->
      <img :src="logo" alt="Logo" width="145" height="100" class="ms-0">

      <!-- 네비게이션 메뉴 -->
      <nav class="navbar navbar-expand-lg">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-gap">
          <li class="nav-item" v-for="nav in navItems" :key="nav.name">
            <RouterLink
              :to="{ name: nav.route }"
              class="nav-link d-flex align-items-center gap-2"
              :class="{ active: selectedNav === nav.route }"
              @click="handleNavClick(nav.route)">
              <font-awesome-icon :icon="nav.icon" class="fs-5" />
              {{ nav.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- 로그인/회원가입 또는 프로필/로그아웃 섹션 (오른쪽 정렬) -->
      <div class="d-flex align-items-center gap-3 ms-0 justify-content-end">
        <div class="d-flex align-items-center gap-3">
          <RouterLink
            v-if="!store.isLogin"
            to="/login"
            class="text-decoration-none d-flex align-items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-sign-in-alt" class="fs-5" />
            로그인
          </RouterLink>
          <RouterLink
            v-if="!store.isLogin"
            to="/signup"
            class="text-decoration-none d-flex align-items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-user-plus" class="fs-5" />
            회원가입
          </RouterLink>
          <RouterLink
            v-else
            to="/profile"
            class="text-decoration-none d-flex align-items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-user" class="fs-5 text-primary user-icon" />
          </RouterLink>
          <font-awesome-icon
            v-if="store.isLogin"
            icon="fa-solid fa-right-from-bracket"
            @click="openModal"
            class="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"/>
        </div>
      </div>
    </div>
  </header>

  <main class="container my-4">
    <Modal :isOpen="isModalOpened" @modal-close="closeModal" :class="modalClass">
      <template #content>
        <p class="modal-message text-center fw-bold">로그아웃 하시겠습니까?</p>
        <div class="modal-buttons d-flex justify-content-center gap-3">
          <button @click="logOut" class="btn btn-danger">로그아웃</button>
          <button @click="closeModal" class="btn btn-secondary">취소</button>
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
import logo from '@/assets/whiskerlogo.png';

const store = useCounterStore();
const isModalOpened = ref(false);
const modalClass = ref('fade-in');
const selectedNav = ref(null);

// 아이콘 클릭 상태를 추적하는 변수 (login, signup 상태별로 관리)
const isClicked = ref({
  login: false,
  signup: false
});

const navItems = [
  { label: 'Home', route: 'MainView', icon: 'fa-solid fa-home' },
  { label: '자유게시판', route: 'ArticleView', icon: 'fa-solid fa-comments' },
  { label: '금융상품추천', route: 'RecView', icon: 'fa-solid fa-piggy-bank' },
  { label: '은행찾기', route: 'MapView', icon: 'fa-solid fa-map-marker-alt' },
  { label: '상품보기', route: 'ProductsView', icon: 'fa-solid fa-shopping-cart' },
  { label: '환전하기', route: 'ExchangeView', icon: 'fa-solid fa-exchange-alt' },
];

const openModal = () => {
  isModalOpened.value = true;
  modalClass.value = 'fade-in';
};

const closeModal = () => {
  isModalOpened.value = false;
  modalClass.value = 'fade-in';
};

const logOut = () => {
  store.logOut();
  if (isModalOpened) closeModal();
};

const handleNavClick = (navName) => {
  selectedNav.value = navName;
};

// 아이콘 클릭 시 색상 변경 함수
const toggleIconColor = (type) => {
  isClicked.value[type] = !isClicked.value[type]; // 클릭 시 색상 상태 토글
};
</script>

<style scoped>
/* 로그인/회원가입 버튼 아이콘 클릭 시 색상 변경 */
.icon-clicked {
  color: #6751b1; /* 클릭 시 색상 변경 */
}

/* 나머지 스타일들 */
.header .container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header img {
  margin-left: 0px;
}

.header .nav-link {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  transition: all 0.3s ease;
  position: relative;
}

.header .nav-link.active {
  color: #0d6efd;
}

.header .nav-link:hover {
  color: #0056b3;
}

.header .nav-link:hover::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0056b3;
  transition: width 0.3s ease;
}

.btn-primary:hover {
  background-color: #004085;
  border-color: #003766;
}

.btn-outline-primary:hover {
  background-color: #e9ecef;
  color: #004085;
}

/* 로그인/회원가입 버튼 */
.header .d-flex.align-items-center a {
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.user-icon:hover {
  color: #004085;
}

.modal-message {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-buttons button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.modal-buttons .btn-danger:hover {
  background-color: #b52a2a;
}

.modal-buttons .btn-secondary:hover {
  background-color: #5a6268;
}

.nav-gap {
  gap: 30px;
}

.header .d-flex.ms-auto {
  margin-left: auto;
}
</style>
