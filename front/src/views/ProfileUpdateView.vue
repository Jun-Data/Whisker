<template>
  <div class="profile-update-container">
    <div class="profile-update-card">
      <h1 class="title">프로필 수정</h1>
      <form @submit.prevent="updateUser" class="form-container">
        <div class="form-group">
          <label for="username">아이디</label>
          <input id="username" v-model="username" type="text" />
          <span v-if="usernameErr" class="error-message">{{ usernameErr }}</span>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input id="email" v-model="email" type="email" />
          <span v-if="emailErr" class="error-message">{{ emailErr }}</span>
        </div>
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input id="nickname" v-model="nickname" type="text" />
          <span v-if="nicknameErr" class="error-message">{{ nicknameErr }}</span>
        </div>
        <div class="form-group">
          <label for="age">나이</label>
          <input id="age" v-model="age" type="number" />
          <span v-if="ageErr" class="error-message">{{ ageErr }}</span>
        </div>
        <div class="form-group">
          <input type="submit" value="수정" class="submit-button" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useCounterStore();
const router = useRouter();

const username = ref(store.userData.username);
const email = ref(store.userData.email);
const nickname = ref(store.userData.nickname);
const age = ref(store.userData.age);

const usernameErr = ref(null);
const emailErr = ref(null);
const nicknameErr = ref(null);
const ageErr = ref(null);

const updateUser = () => {
  axios({
    method: 'put',
    url: `${store.API_URL}/accounts/update/${store.userData.pk}/`,
    data: {
      username: username.value,
      email: email.value,
      nickname: nickname.value,
      age: age.value,
    }
  })
  .then(res => {
    console.log(res.data);
    router.push({ name: 'ProfileView' });
  })
  .catch(err => {
    const { username, email, nickname, age } = err.response.data;
    usernameErr.value = username ? username[0] : null;
    emailErr.value = email ? email[0] : null;
    nicknameErr.value = nickname ? nickname[0] : null;
    ageErr.value = age ? age[0] : null;
  });
};
</script>

<style scoped>
.profile-update-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #f7f8fc;
  padding: 30px 15px;
}

.profile-update-card {
  background-color: #fff;
  padding: 40px 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

/* 타이틀 스타일 */
.title {
  font-size: 2.6rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

/* 폼 그룹 스타일 */
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

/* 레이블 스타일 */
label {
  display: block;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
}

/* 선택 및 입력 필드 스타일 */
input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

input:focus {
  border-color: #5c6bc0;
  outline: none;
}

/* 버튼 스타일 */
.submit-button {
  width: 100%;
  background-color: #5c6bc0;
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
  background-color: #3f51b5;
  transform: scale(1.05);
}

/* 에러 메시지 스타일 */
.error-message {
  color: red;
  font-size: 0.875rem;
}

/* 페이지 컨테이너 스타일 */
.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>
