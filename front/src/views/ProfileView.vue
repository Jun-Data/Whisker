<template>
  <div>
    <h1>{{ store.user }} 님의 프로필 페이지</h1>
    <div v-for="(value,key) in store.userData" :key="key">
      <div v-if="key !=='pk'">
        <p>{{ key }} : {{ value }}</p>
      </div>     
    </div>
    <button>수정하기</button>
    <br><br><br>
    <h2>가입한 상품</h2>
    <br><br><br>
    <h2>가입한 상품 금리</h2>
    
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'; // store 가져오기
import { ref, onMounted } from 'vue'; // ref와 onMounted 가져오기

const store = useCounterStore();

onMounted(()=>{
  store.getUser()
})
</script>

<style scoped>
/* 스타일 추가 */
</style>
