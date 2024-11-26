<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">로그인</h1>
      <h3 class="subtitle">계정을 입력하고 로그인하세요!</h3>
      
      <!-- form 태그로 그룹화 -->
      <form @submit.prevent="logIn">
      
      <!-- 사용자명 입력 -->
      <div class="form-group">
        <label for="username">아이디</label>
        <input type="text" id="username" v-model.trim="username" class="input-field" placeholder="아이디를 입력하세요" />
      </div>

      <!-- 비밀번호 입력 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <div class="password-input-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model.trim="password"
            class="input-field"
            placeholder="비밀번호를 입력하세요"
          />
          <button type="button" class="toggle-password" @click="togglePasswordVisibility">
            <font-awesome-icon :icon="showPassword ? 'eye' :'eye-slash'" />
          </button>
        </div>
      </div>

      <!-- 제출 버튼 -->
      <div class="form-group">
        <button class="submit-button" @click="logIn">로그인</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const username = ref(null)
const password = ref(null)
const showPassword = ref(false) // 비밀번호 표시 여부 상태

const store = useCounterStore()

const logIn = function () {
  const payload = {
    username: username.value,
    password: password.value
  }
  store.logIn(payload)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
/* 로그인 페이지 컨테이너 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #f9f9fb;
  padding: 40px 20px;
}

/* 로그인 카드 */
.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* 타이틀과 서브타이틀 */
.title {
  font-size: 2.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
}

/* 폼 그룹 */
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;  /* 입력 필드와 레이블을 왼쪽 정렬 */
  margin-bottom: 20px;
  width: 100%;
}

/* 레이블 */
label {
  font-weight: bold;
  margin-bottom: 5px;
  width: 100%;
  text-align: left;
}

/* 입력 필드 */
.input-field {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-top: 8px;
  box-sizing: border-box;
}

/* 비밀번호 입력창과 토글 버튼을 감싼 컨테이너 */
.password-input-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

/* 토글 버튼 */
.toggle-password {
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  top: 60%;
  transform: translateY(-50%); /* 세로 가운데 정렬 */
  cursor: pointer;
  font-size: 0.85rem; /* 아이콘 크기 줄이기 */
  color: #888;
}

.toggle-password:hover {
  color: #333;
}

/* 버튼 스타일 */
.submit-button {
  width: 100%;
  background-color: #585bd6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3134c7; /* hover 시 더 진한 색상 */
  transform: scale(1.05);
}
</style>
