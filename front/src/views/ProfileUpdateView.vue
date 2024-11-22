<template>
  <div>
    <h1>수정 페이지</h1>
    <div>
      <form @submit.prevent="updateUser">
        <div>
          <label for="username">username</label>
          <input id="username" v-model="username" type="text">
        </div>
        <div>
          <label for="email">email </label>
          <input id="email" v-model="email" type="text">
        </div>
        <div>
          <label for="first_name">first_name </label>
          <input id="first_name" v-model="first_name" type="text">
        </div>
        <div>
          <label for="last_name">last_name</label>
          <input id="last_name" v-model="last_name" type="text">
        </div>
        <div>
          <label for="nickname">nickname</label>
          <input id="nickname" v-model="nickname" type="text">
        </div>
        <div>
          <label for="age">age</label>
          <input id="age" v-model="age" type="text">
        </div>
        <div>
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
        </div>
        <input type="submit">
      </form>
    </div>
  </div>
</template>


<script setup>
  import { useCounterStore } from '@/stores/counter';
  import axios from 'axios';
  import { ref } from 'vue';
  const store = useCounterStore()
  const username = ref(store.userData.username);
  const email = ref(store.userData.email);
  const first_name = ref(store.userData.first_name);
  const last_name = ref(store.userData.last_name);
  const nickname = ref(store.userData.nickname);
  const age = ref(store.userData.age);
  const earn = ref(store.userData.earn);
  const family = ref(store.userData.family);
  const location = ref(store.userData.location);
  const risk = ref(store.userData.risk);
  const term = ref(store.userData.term);
  const saving = ref(store.userData.saving);
  const patience = ref(store.userData.patience);
  const know = ref(store.userData.know);
  
  // const updateUser = () => {
  //   axios({
  //     method: 'put',
  //     url: `${store.API_URL}/accounts/update/${store.userData.pk}/`,
  //     data: {
  //       username: username.value,
  //       email: email.value,
  //       first_name: first_name.value,
  //       last_name: last_name.value,
  //       nickname: nickname.value,
  //       age: age.value,
  //       earn: earn.value,
  //       family: family.value,
  //       location: location.value,
  //       risk: risk.value,
  //       term: term.value,
  //       saving: saving.value,
  //       patience: patience.value,
  //       know: know.value,
  //     }
  //   })
  //   .then(res => {
  //     console.log(res.data)
  //   })
  // }
  
</script>

<style scoped>
  
</style>