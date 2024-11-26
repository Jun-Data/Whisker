<template>
  <header class="header bg-light shadow-sm py-3">
    <div class="container d-flex align-items-center">
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

      <!-- 로그인/회원가입 섹션 (오른쪽 정렬) -->
      <div class="ms-auto">
        <div v-if="!store.isLogin" class="d-flex align-items-center gap-3">
          <RouterLink
            to="/login"
            class="btn btn-outline-primary d-flex align-items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-sign-in-alt" class="fs-5" />
            로그인
          </RouterLink>
          <RouterLink
            to="/signup"
            class="btn btn-primary d-flex align-items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-user-plus" class="fs-5" />
            회원가입
          </RouterLink>
        </div>
        <div v-else class="d-flex align-items-center gap-3">
          <RouterLink to="/profile" class="text-decoration-none d-flex align-items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-user" class="fs-4 text-primary user-icon" />
          </RouterLink>
          <h4>|</h4>
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" @click="openModal" class="btn btn-outline-danger btn-sm d-flex align-items-center gap-2" />
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
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faComments,
  faPiggyBank,
  faMapMarkerAlt,
  faShoppingCart,
  faExchangeAlt,
  faUser,
  faSignInAlt,
  faUserPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faHome,
  faComments,
  faPiggyBank,
  faMapMarkerAlt,
  faShoppingCart,
  faExchangeAlt,
  faUser,
  faSignInAlt,
  faUserPlus,
  faRightFromBracket
);

const store = useCounterStore();
const isModalOpened = ref(false);
const modalClass = ref('fade-in');
const selectedNav = ref(null);

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
</script>


<style scoped>
.header .nav-link {
  font-size: 18px;
  font-weight: bold;
}

.header .nav-link.active {
  color: #0d6efd; /* Bootstrap 기본 색상 */
}

/* 로고 위치 */
.header img {
  margin-left: 0; /* 왼쪽 여백을 제거하여 왼쪽 끝에 배치 */
}

.modal-message {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 네비게이션 링크 스타일 */
.header .nav-link {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  transition: all 0.3s ease;
  position: relative;
}

/* 선택된 네비게이션 링크 색상 */
.header .nav-link.active {
  color: #0d6efd; /* Bootstrap 기본 색상 */
}

/* 네비게이션 호버 스타일 */
.header .nav-link:hover {
  color: #0056b3; /* 어두운 블루 톤 */
}

.header .nav-link:hover::after {
  content: '';
  position: absolute;
  bottom: -3px; /* 텍스트 아래쪽 */
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0056b3; /* 하이라이트 색상 */
  transition: width 0.3s ease;
}

/* 로그인/회원가입 버튼 호버 */
.btn-primary:hover {
  background-color: #004085;
  border-color: #003766;
}

.btn-outline-primary:hover {
  background-color: #e9ecef;
  color: #004085;
}

/* 로그아웃 버튼 스타일 */
.log-out-btn:hover {
  background-color: #dc3545;
  color: white;
}

/* 사용자 아이콘 호버 스타일 */
.user-icon:hover {
  color: #004085;
}

/* 모달 창 메시지 */
.modal-message {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 모달 버튼 스타일 */
.modal-buttons button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.modal-buttons .btn-danger:hover {
  background-color: #b52a2a;
}

.modal-buttons .btn-secondary:hover {
  background-color: #5a6268;
}

/* 네비게이션 요소 간 간격 조정 */
.nav-gap {
  gap: 30px; /* 네비게이션 항목 간 간격 설정 */
}

.nav-link {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  transition: all 0.3s ease;
}

.nav-link.active {
  color: #0d6efd;
}

.nav-link:hover {
  color: #0056b3;
}


</style>