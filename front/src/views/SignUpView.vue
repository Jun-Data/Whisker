<template>
  <div class="signup-container">
    <div class="signup-card">
      <h1 class="title">회원가입</h1>
      <h3 class="subtitle">계정을 입력하고 회원가입을 완료하세요!</h3>

      <!-- 아이디 입력 -->
      <div class="form-group">
        <label for="username">아이디</label>
        <input type="text" id="username" v-model.trim="username" class="input-field" placeholder="아이디를 입력하세요" />
        <span v-if="usernameErr" id="err">{{usernameErr}}</span>
      </div>

      <!-- 비밀번호 입력 -->
      <div class="form-group">
        <label for="password1">비밀번호</label>
        <input type="password" id="password1" v-model.trim="password1" class="input-field" placeholder="비밀번호를 입력하세요" @input="validatePassword" />
        <span v-if="password1Err" id="err">{{password1Err}}</span>
        <!-- 비밀번호 조건 메시지 -->
        <span v-if="password1 && !password1Err && !passwordValid" class="password-requirements">
          비밀번호는 최소 6자 이상이어야 하며, 숫자를 포함해야 합니다.
        </span>
      </div>

      <!-- 비밀번호 확인 입력 -->
      <div class="form-group">
        <label for="password2">비밀번호 확인</label>
        <input type="password" id="password2" v-model.trim="password2" class="input-field" placeholder="비밀번호를 확인하세요" @input="checkPasswordMatch" />
        <span v-if="password2Err" id="err">{{password2Err}}</span>
      </div>

      <!-- 이름 입력 -->
      <div class="form-group">
        <label for="first_name">이름</label>
        <input type="text" id="first_name" v-model.trim="first_name" class="input-field" placeholder="이름을 입력하세요" />
        <span v-if="firstNameErr" id="err">{{firstNameErr}}</span>
      </div>

      <!-- 성 입력 -->
      <div class="form-group">
        <label for="last_name">성</label>
        <input type="text" id="last_name" v-model.trim="last_name" class="input-field" placeholder="성을 입력하세요" />
        <span v-if="lastNameErr" id="err">{{lastNameErr}}</span>
      </div>

      <!-- 제출 버튼 -->
      <div class="form-group">
        <button type="submit" class="submit-button" @click="signUp">회원가입</button>
      </div>
      
      <!-- 기타 에러 메시지 -->
      <div class="form-group" v-if="etcErr">
        <span id="err">{{ etcErr }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref(null)
const first_name = ref(null)
const last_name = ref(null)
const password1 = ref(null)
const password2 = ref(null)

const store = useCounterStore()
const router = useRouter()

const usernameErr = ref(null)
const password1Err = ref(null)
const password2Err = ref(null)
const firstNameErr = ref(null)
const lastNameErr = ref(null)
const etcErr = ref(null)

const passwordValid = ref(false) // 비밀번호 조건이 만족되었는지 체크

// 비밀번호 조합 확인 함수 (6자 이상, 숫자 포함)
const validatePassword = () => {
  const password = password1.value;
  const passwordRegex = /^(?=.*\d).{6,}$/;  // 6자 이상, 숫자 포함

  if (!passwordRegex.test(password)) {
    passwordValid.value = false;
    password1Err.value = "비밀번호는 최소 6자 이상이어야 하며, 숫자를 포함해야 합니다.";
  } else {
    passwordValid.value = true;
    password1Err.value = null; // 조건을 만족하면 에러 메시지 제거
  }
}

// 비밀번호 확인 함수
const checkPasswordMatch = () => {
  if (password1.value !== password2.value) {
    password2Err.value = "비밀번호가 일치하지 않습니다.";
  } else {
    password2Err.value = null;
  }
}

// 비밀번호 조합 및 일치 여부 체크
const signUp = function () {
  // 비밀번호 조건 확인
  if (!passwordValid.value) {
    return;  // 비밀번호 조건을 만족하지 않으면 회원가입을 진행하지 않음
  }

  // 비밀번호 일치 여부 확인
  if (password1.value !== password2.value) {
    password2Err.value = "비밀번호가 일치하지 않습니다.";
    return;  // 비밀번호가 일치하지 않으면 회원가입을 진행하지 않음
  }

  axios({
    method: 'post',
    url: `${store.API_URL}/accounts/signup/`,
    data : {
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      password1: password1.value,
      password2: password2.value,
    }
  })
  .then(res => {
    const key = res.data.key
    store.token = key
    store.getUser()
    store.user = store.userData.username
    router.push({name: 'MainView'})
  })
  .catch(err => {
    const { non_field_errors, username, first_name, last_name, password1, password2 } = err.response.data
    usernameErr.value = username ? username[0] : null
    firstNameErr.value = first_name ? first_name[0] : null
    lastNameErr.value = last_name ? last_name[0] : null
    password1Err.value = password1 ? password1[0] : null
    password2Err.value = password2 ? password2[0] : null
    etcErr.value = non_field_errors ? non_field_errors[0] : null
  })
}
</script>

<style scoped>
/* 회원가입 페이지 컨테이너 */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #f9f9fb;
  padding: 40px 20px;
}

/* 회원가입 카드 */
.signup-card {
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
  align-items: flex-start; /* 입력 필드와 레이블을 왼쪽 정렬 */
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

/* 에러 메시지 */
#err {
  color: red;
  font-size: 0.85rem;
  margin-top: 5px;
}

/* 비밀번호 요구 사항 */
.password-requirements {
  color: #ff5e57;
  font-size: 0.85rem;
  margin-top: 5px;
}
</style>
