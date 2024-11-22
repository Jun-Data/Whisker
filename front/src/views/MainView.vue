<template>
  <div>
    <h1>메인 페이지</h1>
  </div>
      <!-- assets 폴더의 이미지 사용 -->
      <img :src="cat_1" alt="Logo" class="main-image" />

</template>

<script setup>
import cat_1 from '@/assets/cat_1.jpg'; // assets 폴더에서 이미지 import
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: #666;
}
</style>