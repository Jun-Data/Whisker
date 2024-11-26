<template>
  <div class="profile-update-container">
    <h1>수정 페이지</h1>
    <div>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="username">아이디</label>
          <input id="username" v-model="username" type="text">
          <span v-if="usernameErr" id="err">{{usernameErr}}</span>
        </div>
        <div class="form-group">
          <label for="email">email </label>
          <input id="email" v-model="email" type="text">
          <span v-if="emailErr" id="err">{{emailErr}}</span>
        </div>
        <!-- <div>
          <label for="first_name">first_name </label>
          <input id="first_name" v-model="first_name" type="text">
        </div>
        <div>
          <label for="last_name">last_name</label>
          <input id="last_name" v-model="last_name" type="text">
        </div> -->
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input id="nickname" v-model="nickname" type="text">
          <span v-if="nicknameErr" id="err">{{nicknameErr}}</span>
        </div>
        <div class="form-group">
          <label for="age">나이</label>
          <input id="age" v-model="age" type="text">
          <span v-if="ageErr" id="err">{{ageErr}}</span>
        </div>
        <!-- <div>
          <label for="earn">earn</label>
          <input id="earn" v-model="earn" type="text">
        </div>
        <div>
          <label for="family">family </label>
          <input id="family" v-model="family" type="text">
        </div>
        <div>
          <label for="location">location</label>
          <input id="location" v-model="location" type="text">
        </div>
        <div>
          <label for="risk">risk </label>
          <input id="risk" v-model="risk" type="text">
        </div>
        <div>
          <label for="term">term </label>
          <input id="term" v-model="term" type="text">
        </div>
        <div>
          <label for="saving">saving </label>
          <input id="saving" v-model="saving" type="text">
        </div>
        <div>
          <label for="patience">patience</label>
          <input id="patience" v-model="patience" type="text">
        </div>
        <div>
          <label for="know">know</label>
          <input id="know" v-model="know" type="text">
        </div> -->
        <div class="form-group">

          <input type="submit" value="수정" class="submit-btn">
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

  const store = useCounterStore()
  const router = useRouter()

  const username = ref(store.userData.username);
  const email = ref(store.userData.email);
  // const first_name = ref(store.userData.first_name);
  // const last_name = ref(store.userData.last_name);
  const nickname = ref(store.userData.nickname);
  const age = ref(store.userData.age);
  // const earn = ref(store.userData.earn);
  // const family = ref(store.userData.family);
  // const location = ref(store.userData.location);
  // const risk = ref(store.userData.risk);
  // const term = ref(store.userData.term);
  // const saving = ref(store.userData.saving);
  // const patience = ref(store.userData.patience);
  // const know = ref(store.userData.know);
  const usernameErr = ref(null)
  const emailErr = ref(null)
  const nicknameErr = ref(null)
  const ageErr = ref(null)
  
  const updateUser = () => {
    axios({
      method: 'put',
      url: `${store.API_URL}/accounts/update/${store.userData.pk}/`,
      data: {
        username: username.value,
        email: email.value,
        // first_name: first_name.value,
        // last_name: last_name.value,
        nickname: nickname.value,
        age: age.value,
        // earn: earn.value,
        // family: family.value,
        // location: location.value,
        // risk: risk.value,
        // term: term.value,
        // saving: saving.value,
        // patience: patience.value,
        // know: know.value,
      }
    })
    .then(res => {
      console.log(res.data)
      router.push({name: 'ProfileView'})
    })
    .catch(err => {
      const {username, email, nickname, age} = err.response.data
      usernameErr.value = username ? username[0] : null
      emailErr.value = email ? email[0] : null
      nicknameErr.value = nickname ? nickname[0] : null
      ageErr.value = age ? age[0] : null
    })
  }
  
</script>

<style scoped>
.profile-update-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* 폼 그룹 스타일 */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
.form-group #err {
  color: red;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  transition: color 0.3s;
}

label:hover {
  color: #007bff; /* 하이라이트 색상 */
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

/* 버튼 스타일 */
.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>

