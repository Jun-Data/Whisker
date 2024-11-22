<template>
  <div class="rec-container">
    <h1>금융 상품 추천 서비스</h1>
    <h3>게임을 플레이하고 나에게 맞는 금융 상품을 추천받아보세요!</h3>
          <!-- assets 폴더의 이미지 사용 -->
          <img :src="cat_2" alt="Logo" class="main-image" />
    <RouterLink :to="{ name: 'Game' }"><button class="play-button">Play</button></RouterLink>
    
  </div>
</template>

<script setup>
import cat_2 from '@/assets/cat_2.jpg'; // assets 폴더에서 이미지 import
</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.rec-container {
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
}

/* 버튼 스타일 */
.play-button {
  background-color: #007bff; /* 파란색 */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

/* 버튼 hover 시 효과 */
.play-button:hover {
  background-color: #0056b3; /* hover 시 더 진한 파란색 */
  transform: scale(1.05); /* 살짝 확대 */
}

/* 버튼 클릭 시 효과 */
.play-button:active {
  transform: scale(0.95); /* 클릭 시 살짝 축소 */
}

/* Fade 애니메이션 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>