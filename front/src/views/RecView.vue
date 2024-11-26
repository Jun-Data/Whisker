<template>
  <div class="rec-container">
    <!-- 타이틀 영역 -->
    <h1 class="title">금융 상품 추천 서비스</h1>
    <h3 class="subtitle">게임을 플레이하고 나에게 맞는 금융 상품을 추천받아보세요!</h3>
    
    <!-- 이미지 영역 -->
    <div class="image-container">
      <img :src="cat_2" alt="Logo" class="main-image" />
    </div>
    
    <!-- 버튼 영역 -->
    <RouterLink :to="{ name: 'Game' }">
      <button class="play-button"> <font-awesome-icon :icon="['fas', 'paw']" />  게임 시작 !</button>
    </RouterLink>
  </div>
</template>

<script setup>
import cat_2 from '@/assets/cat_2.jpg'; // assets 폴더에서 이미지 import
import { useProductStore } from '@/stores/product';

const store = useProductStore();
</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.rec-container {
  text-align: center;
  margin: 0 auto;
  padding: 40px 20px;
  max-width: 800px;
  background-color: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 타이틀 스타일 */
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

/* 이미지 컨테이너 스타일 */
.image-container {
  margin: 20px auto;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.main-image {
  width: 50%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.05); /* hover 시 확대 */
}

/* 버튼 스타일 */
.play-button {
  background-color: #585bd6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  margin-top: 20px;
}

/* 버튼 hover 효과 */
.play-button:hover {
  background-color:  #3134c7;/* hover 시 더 진한 초록색 */
  transform: scale(1.05); /* 살짝 확대 */
}

/* 버튼 클릭 효과 */
.play-button:active {
  transform: scale(0.95); /* 클릭 시 살짝 축소 */
}
</style>
